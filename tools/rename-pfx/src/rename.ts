/* assign the new prefix variable
 * then traverse the diretory tree and rename all files
* that starts with the "pfx-" to start with new prefix;
* scan all files and search for the lines containing string "@_pfx_@ and 
*  on the same line replace all occurences of "pfx" with the new prefix while preserving
* the case style of the original string.
*/

import * as fs from 'fs';
import * as readline from 'readline';

import * as glob from 'glob';
import ignore from 'ignore';
import minimist from 'minimist';
import path from 'path';

const args = minimist(process.argv.slice(2));
const rootDir = args['root-dir'] || '.';
const newPrefix = args['new-prefix'] || 'pfx';
const globPattern = args['glob'] || '**/*.{ts,tsx,js,jsx,css,scss,html,yaml,yml,json,md}';

const oldPrefix = 'pfx'; 
const lineMarker = '@_pfx_@'; 


function renameFileContent(file: string) {
    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });

    const newLines: string[] = [];
    rl.on('line', (line: string) => {
        if (!line.includes(lineMarker)) {
            newLines.push(line);
            return;
        }
        const regex = new RegExp(oldPrefix, 'gi');
        const newLine = line.replace(regex, (match) => {
            const firstChar = match.charAt(0);
            if (match.charAt(0) !== firstChar.toUpperCase()) { 
                // all are assumed small case 'pfx'
                return newPrefix;
            }

            if (match.charAt(1) !== match.charAt(1).toUpperCase()) { 
                // first char is upper case, second is lower case 'Pfx'
                return newPrefix.charAt(0).toUpperCase() + newPrefix.slice(1);
            }

            // all are upper case 'PFX'
            return newPrefix.toUpperCase();
        });
        newLines.push(newLine);
    });

    rl.on('close', () => {
        fs.writeFileSync(file, newLines.join('\n'));
    });
}

const traverseDirWithGlob = (dirPath: string, globPattern: string) => {
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory ${dirPath} does not exist`);
        return;
    }
    const ig = ignore();
    let ignoreFilePaths = [path.join(dirPath, '.pfxignore'), path.join(dirPath, '.gitignore')];
    ignoreFilePaths.forEach((ignoreFilePath) => {
        if (fs.existsSync(ignoreFilePath)) {
            ignore().add(fs.readFileSync(ignoreFilePath).toString())
        }
    });

    let files = glob.sync(globPattern, { cwd: dirPath, nodir: true });
    files.forEach((file) => {
        if (!ig.ignores(file)) {            
            renameFileContent(file);
        }
    });

    files = glob.sync(globPattern, { cwd: dirPath, nodir: false });
    
    files.sort((a, b) => b.length - a.length);
    files.forEach((file) => {
        if (!ig.ignores(file)) {  
            const basename = path.basename(file);
            if (basename.startsWith(oldPrefix)) {
                const newBaseName = basename.replace(oldPrefix, newPrefix);
                fs.renameSync(path.join(dirPath,file), path.join(dirPath, path.dirname(file),  newBaseName));
            }
        }
    });
};

traverseDirWithGlob(rootDir, globPattern);

console.log('Prefix renaming done!');

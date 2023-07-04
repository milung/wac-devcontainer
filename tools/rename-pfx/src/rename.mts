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
import { exit } from 'process';

const args = minimist(process.argv.slice(2));
const rootDir = args['root-dir'] || '.';
const newPrefix = args['new-prefix'] || 'pfx';
const oldPrefix = args['old-prefix'] || 'pfx';

const allowedExtensions = ["ts", "tsx", "js", "jsx", "html", "yaml", "yml"];


const lineMarker = `@_${oldPrefix}_@`;


async function renameFileContent(file: string): Promise<void> {
    if (!allowedExtensions.includes(path.extname(file))) { return Promise.resolve(); }
    const fileStream = fs.createReadStream('input.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let newLines: string[] = [];
    let wasMatched = false;
    for await (const line of rl) {

        if (!line.includes(lineMarker)) {
            newLines.push(line);
            return;
        }
        const regex = new RegExp(oldPrefix, 'gi');
        const newLine = line.replace(regex, (match) => {
            wasMatched = true;
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
    };
    fileStream.close();

    if (wasMatched) {
        console.log(`Edit in ${file}`);
        fs.writeFileSync(file, newLines.join('\n'));
    }
}

// function to recursively traverse the directory dirPath and replace all occurences of oldPrefix with newPrefix
async function renameDirContent(dirPath: string = rootDir, ig = null): Promise<void> {

    if (!fs.existsSync(dirPath)) {
        console.log(`Directory ${dirPath} does not exist`);
        return;
    }
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // test if .gitignore and .pfxignore exists in directory and if yes combine them with ig
    let localIgnore = ignore()
    if (ig) { localIgnore.add(ig); }

    let ignoreFilePaths = [path.join(dirPath, '.pfxignore'), path.join(dirPath, '.gitignore')];
    ignoreFilePaths.forEach((ignoreFilePath) => {
        if (fs.existsSync(ignoreFilePath)) {
            localIgnore.add(fs.readFileSync(ignoreFilePath).toString().split('\n'));
        }
    });

    for (const entry of entries) {
        const fullEntryPath = path.join(entry.path, entry.name);
        if (localIgnore.ignores(fullEntryPath)) { continue; }

        if (entry.isDirectory()) {
            await renameDirContent(fullEntryPath, localIgnore);
        } else {
            await renameFileContent(fullEntryPath);
        }
    }
    const basename = path.basename(dirPath);
    if (basename.startsWith(oldPrefix)) {
        const newBaseName = basename.replace(oldPrefix, newPrefix);
        console.log(`${basename} -> ${newBaseName}`)
        fs.renameSync(dirPath, path.join(path.dirname(dirPath), newBaseName));
    }
}




await renameDirContent();

console.log('Prefix renaming done!');
exit(0);
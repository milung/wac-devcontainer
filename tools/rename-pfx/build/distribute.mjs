import { readdirSync, mkdirSync, copyFileSync } from 'fs'
import { join } from 'path'

const templatesRoot ='../../templates'
const prebuildRoot = '../../prebuild'
const toolsFolder = '.devc-tools'

const templates = readdirSync(templatesRoot)
for (const template of templates) {
    mkdirSync(join(templatesRoot, template, toolsFolder), { recursive: true })
    copyFileSync('./dist/index.mjs', join(templatesRoot, template, toolsFolder, 'rename-pfx.mjs'))
    copyFileSync('./build/init.ps1', join(templatesRoot, template, toolsFolder, 'init.ps1'))
}

mkdirSync(join(prebuildRoot, toolsFolder), { recursive: true })
copyFileSync('./dist/index.mjs', join(prebuildRoot, toolsFolder, 'rename-pfx.mjs'))
copyFileSync('./build/init.ps1', join(prebuildRoot, toolsFolder, 'init.ps1'))

console.log('Done')

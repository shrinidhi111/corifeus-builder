const utils = require('corifeus-utils')
const fsExtra = require('fs-extra')

const start = async () => {
    if (await fsExtra.pathExists('node_modules/twemoji/git')) {
        await fsExtra.remove('node_modules/twemoji/git')
    }
    await utils.childProcess.exec('git clone https://github.com/twitter/twemoji.git node_modules/twemoji/git --depth 1', true)
    if (await fsExtra.pathExists('node_modules/twemoji/2/svg')) {
        await fsExtra.remove('node_modules/twemoji/2/svg')
    }
    await fsExtra.move('node_modules/twemoji/git/2/svg', 'node_modules/twemoji/2/svg')
    await fsExtra.remove('node_modules/twemoji/git')
}
start()

const utils = require('corifeus-utils')
const fsExtra = require('fs-extra')

const start = async () => {
    if (await fsExtra.pathExists('node_modules/twemoji/twemoji-master')) {
        await fsExtra.remove('node_modules/twemoji/twemoji-master')
    }
    await utils.childProcess.exec('curl -L https://github.com/twitter/twemoji/archive/master.zip --output node_modules/twemoji/master.zip', true)
    await utils.childProcess.exec('unzip node_modules/twemoji/master.zip -d node_modules/twemoji/', true)
    if (await fsExtra.pathExists('node_modules/twemoji/2/svg')) {
        await fsExtra.remove('node_modules/twemoji/2/svg')
    }
    await fsExtra.move('node_modules/twemoji/twemoji-master/assets/svg', 'node_modules/twemoji/2/svg')
    await fsExtra.remove('node_modules/twemoji/twemoji-master')
    await fsExtra.remove('node_modules/twemoji/master.zip')
}
start()

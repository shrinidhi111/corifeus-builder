require('corifeus-utils');
const gruntUtil = require('../utils');
const cwd = process.cwd();
const path = require('path');

const upgrade = async (options) => {
    const {grunt, gruntThis} = options;
    const done = gruntThis.async();

    try {

        const command = {
            cmd: path.resolve(`${cwd}/node_modules/.bin/ncu${gruntUtil.commandAddon}`),
            args: [
                '--upgradeAll',
                `--packageFile ` + path.resolve(`${cwd}/package.json`),
            ]
        }
//        grunt.log.writeln(`Executing`, JSON.stringify(command, null, 2))

        await gruntUtil.spawn(options, command)

        await gruntUtil.spawn(options, {
            cmd: `${cwd}/node_modules/.bin/npm${gruntUtil.commandAddon}`,
            args: [
                'install',
                '--non-interactive',
                '--verbose',
                //'--no-progress',
            ]
        })
        done();
    } catch (error) {
        done(error)
    }

}

module.exports = upgrade;

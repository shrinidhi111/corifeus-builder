const fs = require('fs');
const _ = require('lodash');
const git = require('../../git');
const process = require('process');
const path = require('path');
const utils = require('corifeus-utils')

const replaces = {
    prefix: '//corifeus-inject',
    postfix: '//corifeus-inject:end',
}

module.exports = (grunt, inConfig, done) => {
    const config = Object.assign({}, inConfig);

    if (!config.hasOwnProperty('prefix')) {
        config.prefix = replaces.prefix
    }
    if (!config.hasOwnProperty('postfix')) {
        config.postfix = replaces.postfix
    }

    console.log('Config', config);

    const dest = path.dirname(`${process.cwd()}/${config.dest}`);
    console.log(`Destination: ${dest}`)
    const files = grunt.file.expand(config.files)
    let inject = '';
    const template = _.template(config.template);
    let index = 0;
    files.forEach((file) => {
        if (index > 0) {
            inject += '\n';
        }
        index++;
        console.log(`Injectable: ${file}`)
        const relative = path.relative(dest, file).replace(/\\/g, '/')
        console.log(`Relative file: ${relative}`)
        inject += `${template({file: relative})}`

    })
    console.log(`Inject result:`, inject);

    const destFile = path.resolve(config.dest);
    let data = fs.readFileSync(destFile).toString();
    config.replace = inject;
    data = utils.string.inject(data, config);
    grunt.log.writeln(`Injected: ${destFile}, Pre: ${config.prefix}, Post: ${config.postfix}`);
    fs.writeFileSync(destFile, data);

    done()

};

const fs = require('fs');
const _ = require('lodash');
const git = require('../../git');
const process = require('process');
const path = require('path');

const utils = require('corifeus-utils')

const replaces = {
    header: {
        prefix: '[//]: #@corifeus-header',
        postfix: '[//]: #@corifeus-header:end',
    },
    footer: {
        prefix: '[//]: #@corifeus-footer',
        postfix: '[//]: #@corifeus-footer:end',
    }
}

module.exports = async (grunt, inConfig, done) => {

    try {
        const config = Object.assign({}, inConfig);

        ['header', 'footer'].forEach((type) => {
            if (config.hasOwnProperty(type) && config[type]) {
                ['prefix', 'postfix'].forEach((fix) => {
                    if (!config.hasOwnProperty(fix)) {
                        config[fix] = replaces[type][fix];
                    }
                })
            } else {
                config[type] = false;
            }
        })

//    console.log(config);

        const files = grunt.file.expand(config.files);
//    console.log(files);
        const gitData = {
            branch: undefined,
            date: undefined,
            commit: undefined,
            repo: undefined
        };

        const result = await Promise.all([
            git.branch,
            git.date,
            git.commit,
            git.repo
        ])
        gitData.branch = result[0];
        gitData.date = result[1];
        gitData.commit = result[2];
        gitData.repo = result[3];

        config.replace = _.template(config.replace)({
            git: gitData,
            pkg: require(`${process.cwd()}/package.json`)
        });

        files
            .map((file) => fs.readFileSync(file).toString())
            .forEach((data, index) => {
                data = utils.string.inject(data, config);

                grunt.log.writeln(`Replaced: ${files[index]}, Pre: ${config.prefix.replace('[//]:', '')}, Post: ${config.postfix.replace('[//]:', '')}`);
                fs.writeFileSync(files[index], data);
            })
        done();
    } catch (error) {
        done(error);
    }

};

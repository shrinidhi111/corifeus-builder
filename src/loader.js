const task = require('./task/index');
const folder = require('./config/folder/index');
const _ = require('lodash');
const utils = require('corifeus-utils');
const fs = require('fs');

class loader {
    constructor(grunt) {
        this.grunt = grunt

        this.configJit = {
//            jshint: 'grunt-contrib-jshint',
            mochaTest: 'grunt-mocha-test',
            mocha_istanbul: 'grunt-mocha-istanbul',
            clean: 'grunt-contrib-clean',
            watch: 'grunt-contrib-watch',
//            jsdoc: 'grunt-contrib-jsdoc',
        };
    }

    load(options) {

        let pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8'));
        pkg.corifeus = pkg.corifeus || {};
        let originalPkg = JSON.stringify(pkg)

        const grunt = this.grunt;

        options = options || {};

        options.jit = _.merge(this.configJit, options.jit || {})
        options.config = _.merge(require('./config/grunt/js/index')(grunt), options.config)
        const config = options.config;

        if (options.empty) {
            delete options.config['mocha_istanbul'];
            options.replacer = {
                type: 'p3x',
            }
        }

        require('./replaces')(options, pkg);

        grunt.config.merge(config);
        Object.keys(task).forEach((taskItem) => task[taskItem](grunt))

        grunt.registerTask('cory:kill', function () {
            process.exit(1);
        });


        grunt.registerTask('cory:upgrade', function () {

            const upgrade = require('./utils/upgrade')
            upgrade({
                grunt: grunt,
                gruntThis: this,
                defaultOptions: options,
            });
        })

        grunt.registerTask('cory:license', function () {

            const license = require('./utils').license()
            fs.writeFileSync(`${process.cwd()}/LICENSE`, license)
        })


        grunt.registerTask('cory-test', (target) => {
            switch (target) {
                case 'js-mocha':
                    grunt.task.run([
                        'mochaTest',
                        'watch:cory-js-test'
                    ])
                    break;

                case 'angular-protractor':
                    grunt.task.run([
                        'connect:cory-angular',
                        'protractor:cory-angular-chrome',

                    ]);
                    break;

                case 'angular-karma':
                    grunt.task.run([
                        'karma:cory-angular-run',
                        'watch:cory-angular-karma'
                    ]);
                    break;
            }
        });
        grunt.registerTask('cory-build-run', (target) => {
            switch (target) {
                case 'angular':
                    grunt.task.run(config.task.run.angular);
                    break;

                case 'js':
                    grunt.task.run(config.task.run.js);
                    break;
            }
        });


        // should be at the end
        require('jit-grunt')(grunt, options.jit);
        require('time-grunt')(grunt);


        if (originalPkg !== JSON.stringify(pkg)) {
            fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(pkg, null, 4))
        }
    }

    js(options) {
        options = options || {};
        this.load(options);
    }

    empty(options) {
        options = options || {};
        options.empty = true;
        this.load(options);
    }

    ts(options) {
        options = options || {};
        options.config = _.merge(require('./config/grunt/ts/index')(), options.config || {}),
            this.load(options);
    }


}

module.exports = loader;

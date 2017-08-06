const task = require('./task/index');
const folder = require('./config/folder/index');
const _ = require('lodash');
const utils = require('corifeus-utils');

class loader {
    constructor(grunt) {
        this.grunt = grunt

        this.configJit = {
            jshint: 'grunt-contrib-jshint',
            mochaTest: 'grunt-mocha-test',
            mocha_istanbul: 'grunt-mocha-istanbul',
            clean: 'grunt-contrib-clean',
            watch: 'grunt-contrib-watch',
            jsdoc: 'grunt-contrib-jsdoc',
        };
    }

    load(options) {

        const grunt = this.grunt;

        options = options || {};

        options.jit = _.merge(this.configJit, options.jit || {})
        options.config = _.merge(require('./config/grunt/js/index')(grunt), options.config)
        const config = options.config;

        if (options.empty ) {
            delete options.config['mocha_istanbul'];
            options.replacer = {
                type: 'p3x',
            }
        }

        options.replacer = options.replacer || {}
        let replacer = 'corifeus';
        if (typeof(options.replacer) === 'string') {
            replacer = options.replacer;
        } else if (options.replacer.hasOwnProperty('type')) {
            replacer = options.replacer.type;
        }

        const defaultHeader = {
            header: true,
            replace: `
## \${pkg.description}

---
                        `,
            files: [
                'artifacts/**/*.md',
                '*.md',
                '!node_modules',
                '!build',
                '!LICENSE.md',
                '!readme.md',
                '!README.md',
            ]
        }

        const defaultFooter =  {
            footer: true,
            replace: `
---

[**\${pkg.name.toUpperCase()}**](https://pages.corifeus.com/\${git.repo}) Build v\${pkg.version}

[Corifeus](http://www.corifeus.com) by [Patrik Laszlo](http://patrikx3.com)
`,
            files: [
                'artifacts/**/*.md',
                '*.md',
                '!node_modules',
                '!build',
                '!LICENSE.md',
            ]
        };

        const nodeVersion = `# \${pkg.description}

This is an open source project. Just code.

### Node Version Requirement 
\`\`\` 
\${pkg.engines.node} 
\`\`\`  
   
### Built on Node 
\`\`\` 
${process.version}
\`\`\`   
   
The \`\`\`async\`\`\` and \`\`\`await\`\`\` keywords are required.

Install NodeJs:    
https://nodejs.org/en/download/package-manager/    

# Description  
`
        switch(replacer) {
            case 'corifeus':
                options.config['cory-replace'] = {
                    headerMain: {
                        header: true,
                        replace: `
 [![Build Status](https://travis-ci.org/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.org/patrikx3/\${git.repo})  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  
 
---
${nodeVersion}
                        `,
                        files: [
                            'readme.md',
                            'README.md',
                        ]
                    },
                    header: defaultHeader,
                    footer: defaultFooter
                }
                break;

            case 'p3x':
                let nonEmptyP3x = '';
                if (!options.empty) {
                    nonEmptyP3x = `[![Build Status](https://travis-ci.org/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.org/patrikx3/\${git.repo})  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master) 

---
`
                }

                options.config['cory-replace'] = {
                    headerMain: {
                        header: true,
/*  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)
 */

                        replace: `
  ${nonEmptyP3x}
 
${nodeVersion}
                        `,
                        files: [
                            'readme.md',
                            'README.md',
                        ]
                    },
                    header: defaultHeader,
                    footer: defaultFooter
                };
                break;

            case 'home':
                options.config['cory-replace'] = {
                    header: {
                        header: true,
                        replace: `
## \${pkg.description}

---
                        `,
                        files: [
                            'readme.md',
                            'README.md',
                        ]
                    },
                    footer: defaultFooter,
                }
                break;

            default:
                throw new Error(`unknown replacer ${options.replacer}`)
        }

        if (options.replacer.hasOwnProperty('npmio') && options.replacer.npmio === true && options.config['cory-replace'].hasOwnProperty('headerMain')) {
            const replace = options.config['cory-replace'].headerMain.replace;

            const append = replace.substring(replace.indexOf('---'));

            options.config['cory-replace'].headerMain.replace = replace.substring(0, replace.indexOf('---')) + `  
[![NPM](https://nodei.co/npm/\${pkg.name}.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/\${pkg.name}/)
` + append
        }

        grunt.config.merge(config);
        Object.keys(task).forEach((taskItem) => task[taskItem](grunt))


        grunt.registerTask('cory-test', (target) => {
            switch(target) {
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
            switch(target) {
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
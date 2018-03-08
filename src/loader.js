const task = require('./task/index');
const folder = require('./config/folder/index');
const _ = require('lodash');
const utils = require('corifeus-utils');
const fs = require('fs');

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

        const replaceFiles = [
            'artifacts/**/*.md',
            'docs/**/*.md',
            '*.md',
            '!node_modules',
            '!build',
            '!LICENSE.md',
            '!readme.md',
            '!README.md',
        ]

        const defaultHeader = {
            header: true,
            replace: `
## \${pkg.description}

---
                        `,
            files: replaceFiles
        }

        const defaultFooter =  {
            footer: true,
            replace: `
---

[**\${pkg.name.toUpperCase()}**](https://pages.corifeus.com/\${git.repo}) Build v\${pkg.version} 

[![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software) [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) 


## Sponsor

[![JetBrains](https://www.patrikx3.com/images/jetbrains-logo.svg)](https://www.jetbrains.com/)
  
 
`,
            files: replaceFiles
        };

        let angularVersion = '';
        const angularPkgPath = `${process.cwd()}/node_modules/@angular/common/package.json`;
        if (fs.existsSync(angularPkgPath)) {
            const angularPkg = JSON.parse(fs.readFileSync(angularPkgPath).toString());
            angularVersion = `
# Built on Angular

\`\`\`text
${angularPkg.version}
\`\`\`
            
`
        }

        const hideNodeVersion = options.hasOwnProperty('replacer') && options.replacer.node === false;

        let hideBuild = options.hasOwnProperty('replacer') && options.replacer.build === false;

        let build = hideBuild ? '' : `[![Build Status](https://travis-ci.org/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.org/patrikx3/\${git.repo})  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)`

        let nodeVersion = hideNodeVersion ? `# \${pkg.description}  v\${pkg.version}    

# Description  

` : `# \${pkg.description} v\${pkg.version}  

This is an open source project. Just code. If you like this code, please add a star in GitHub and if you really like, you can donate as well. Thanks you so much!

Given, I have my own server, with dynamic IP address, it could happen that the server for about max 5 minutes can not be reachable for the dynamic DNS or very rarely I backup with Clonzilla the SSD or something with the electricity (too much hoovering or cleaning - but I worked on it, so should not happen again), but for some reason, it is not reachable please hang on for 5-30 minutes and it will be back for sure. 

All my domains (patrikx3.com and corifeus.com) could have errors right now, since I am developing in my free time and you can catch glitches, but usually it is stable (imagine updating everything always, which is weird).

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

${angularVersion}

# Description  
`

        const footerMain = _.clone(defaultFooter);
        footerMain.files = [
            'readme.md',
            'README.md',
        ];
        switch(replacer) {
            case 'corifeus':
                options.config['cory-replace'] = {
                    headerMain: {
                        header: true,
                        replace: `
 ${build}  
 
---
${nodeVersion}
                        `,
                        files: [
                            'readme.md',
                            'README.md',
                        ]
                    },
                    footerMain: footerMain,
                    header: defaultHeader,
                    footer: defaultFooter
                }
                break;

            case 'p3x':
                let nonEmptyP3x = '';
                if (!options.empty) {
                    nonEmptyP3x = `${build} 

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
                    footerMain: footerMain,
                    header: defaultHeader,
                    footer: defaultFooter
                };
                break;

            case 'build':
            case 'lede':
            case 'openwrt':
                let nonEmptyBuild = '';
                if (!options.empty) {
                    nonEmptyBuild = `[![Build Status](https://travis-ci.org/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.org/patrikx3/\${git.repo})  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master) 

# \${pkg.description}

`
                }

                if (replacer === 'openwrt') {
                    nonEmptyBuild += `

## The latest OpenWrt is highly EXPERIMENTAL !!!
                    
`
                }

                options.config['cory-replace'] = {
                    headerMain: {
                        header: true,
                        /*  [![Trello](https://img.shields.io/badge/Trello-p3x-026aa7.svg)](https://trello.com/b/gqKHzZGy/p3x)
                         */

                        replace: `
  ${nonEmptyBuild} 
                        `,
                        files: [
                            'readme.md',
                            'README.md',
                        ]
                    },
                    footerMain: footerMain,
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
const fs = require('fs');
const _ = require('lodash');

module.exports = (options, pkg) => {
    options.replacer = options.replacer || {}
    let replacer = 'corifeus';
    if (typeof(options.replacer) === 'string') {
        replacer = options.replacer;
    } else if (options.replacer.hasOwnProperty('type')) {
        replacer = options.replacer.type;
    }


    let opencollectiveHeader = ''
    let opencollectiveFooter = ''
    pkg.corifeus.opencollective = false;
    if (options.replacer.hasOwnProperty('opencollective') && options.replacer.opencollective === true) {
        pkg.corifeus.opencollective = true;

        pkg.collective = {
            type: "opencollective",
            url: `https://opencollective.com/${pkg.name}`
        }

        opencollectiveHeader = ` [![Backers on Open Collective](https://opencollective.com/\${pkg.name}/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/\${pkg.name}/sponsors/badge.svg)](#sponsors)`
        opencollectiveFooter = `

# Open collective

## Contributors

This project exists thanks to all the people who contribute.  
   
<a href="https://github.com/patrikx3/\${pkg.corifeus.reponame}/graphs/contributors"><img src="https://opencollective.com/\${pkg.name}/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers!   
  
🙏 [Become a backer](https://opencollective.com/\${pkg.name}#backer)
  
<a href="https://opencollective.com/\${pkg.name}#backers" target="_blank"><img src="https://opencollective.com/\${pkg.name}/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. 
  
🙏 [Become a sponsor](https://opencollective.com/\${pkg.name}#sponsor)  
  
<a href="https://opencollective.com/\${pkg.name}/sponsor/0/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/1/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/2/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/3/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/4/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/5/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/6/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/7/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/8/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/\${pkg.name}/sponsor/9/website" target="_blank"><img src="https://opencollective.com/\${pkg.name}/sponsor/9/avatar.svg"></a>
        
`        }

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
# \${pkg.description}

                        `,
        files: replaceFiles
    }

    const defaultFooter =  {
        footer: true,
        replace: `
---

[**\${pkg.name.toUpperCase()}**](https://pages.corifeus.com/\${git.repo}) Build v\${pkg.version} 

[![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software) [![Donate for Corifeus / P3X](https://img.shields.io/badge/Donate-Corifeus-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) 


## P3X Sponsors

[IntelliJ - The most intelligent Java IDE](https://www.jetbrains.com)
  
[![JetBrains](https://cdn.corifeus.com/assets/svg/jetbrains-logo.svg)](https://www.jetbrains.com/) [![NoSQLBooster](https://cdn.corifeus.com/assets/png/nosqlbooster-70x70.png)](https://www.nosqlbooster.com/)

[The Smartest IDE for MongoDB](https://www.nosqlbooster.com)
  
  
${opencollectiveFooter} 
`,
        files: replaceFiles
    };

    let angularVersion = '';
    let nodeJsInfo = `### Node Version Requirement 
\`\`\` 
\${pkg.engines.node} 
\`\`\`  
   
### Built on Node 
\`\`\` 
${process.version}
\`\`\`   
   
The \`\`\`async\`\`\` and \`\`\`await\`\`\` keywords are required.

Install NodeJs:    
https://nodejs.org/en/download/package-manager/`;

    if (options.replacer.hasOwnProperty('nodejsinfo') && options.replacer.nodejsinfo === false) {
        nodeJsInfo = '';
    }


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

    pkg.corifeus.build = !hideBuild;

    let build = hideBuild ? '' : `[![Build Status](https://travis-ci.org/patrikx3/\${git.repo}.svg?branch=master)](https://travis-ci.org/patrikx3/\${git.repo})  [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)  [![Code Coverage](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/patrikx3/\${git.repo}/?branch=master)`

    build += opencollectiveHeader

    let nodeVersion = hideNodeVersion ? `# \${pkg.description}  v\${pkg.version}    

# Description  

` : `# \${pkg.description} v\${pkg.version}  

This is an open-source project. Star this repository if you like it, or even donate!  Thank you so much! :)

I run my own server with dynamic IP address so it may happen that the server can not be reachable for about max 15 minutes due to the dynamic DNS. The server may also be unreachable when I backup the SSD with Clonzilla (very rarely) or an electrical issue (but this should not happen again). When the server is down, please hang on for 15-30 minutes and the server will be back up.

All my domains (patrikx3.com and corifeus.com) could have errors since I am developing in my free time. However, it is usually stable.

**Bugs are evident™ - MATRIX️**

${nodeJsInfo}    

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
# \${pkg.description}

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

}
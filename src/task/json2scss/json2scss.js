const fs = require('fs');
const _ = require('lodash');

module.exports = (grunt, inConfig) => {

    const files = grunt.file.expand(inConfig.files);

    let dest = '';
    files.forEach((file) => {
        const json = JSON.parse(fs.readFileSync(file).toString());

        const resurive = (element, root) => {
            if (root === undefined) {
                root = '$';
                if (inConfig.hasOwnProperty('prefix')) {
                    root += `${inConfig.prefix}-`;
                }
            } else {
                root += '-';
            }
            Object.keys(element).forEach((key) => {
                const actualKey = root + key;
                let actualElement = element[key];

                if (actualElement instanceof Array) {
                    let list = '';
                    actualElement.forEach((arrayElement, arrayIndex) => {
                        if (arrayIndex > 0) {
                            list += ' , ';
                        }
                        if (typeof arrayElement === 'string') {
                            arrayElement = '"' + arrayElement + '"';
                        }
                        list += arrayElement;
                    })
                    dest += `${actualKey}: ${list};\r\n`;
                } else if (typeof actualElement === 'object') {
                    resurive(actualElement, actualKey);
                } else {
                    if (typeof actualElement === 'string') {
                        actualElement = '"' + actualElement + '"';
                    }
                    dest += `${actualKey}: ${actualElement};\r\n`;
                }
            });
        }
        resurive(json);

    })
    fs.writeFileSync(inConfig.dest, dest);
    return dest;

};

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const cwd = process.cwd();
const win32 = process.platform === 'win32';
const commandAddon = win32 ? '.cmd' : ''

const gruntSpawnErrorHandler = (options) => {
    const {result, code, grunt} = options;

    grunt.log.error(`Error code: ${code}`);
    grunt.log.error(String(result));
}

const spawn = (options, spawnddptions) => {

    return new Promise((resolve, reject) => {

        const {grunt, gruntThis} = options;

        spawnOptions.opts = {
            shell: true,
            stdio: 'inherit'
        };

//        grunt.log.writeln(JSON.stringify(spawnOptions, null, 4), typeof spawnOptions.cmd)
        grunt.log.ok(`${spawnOptions.grunt ? 'grunt': path.basename(spawnOptions.cmd)} ${spawnOptions.args.join(' ')} done as:`)
        if (spawnOptions.grunt !== undefined || spawnOptions.cmd === 'grunt') {
            spawnOptions.args = spawnOptions.args || [];
            if (!Array.isArray(spawnOptions.args)) {
                spawnOptions.args = [
                    spawnOptions.args
                ]
            }

            spawnOptions.args.push('--grunt-corifeus-time-disable')
        }



        //       grunt.log.writeln(JSON.stringify(spawnOptions, null, 4))



        grunt.util.spawn(spawnOptions, function (error, result, code) {
            if (error) {
                gruntSpawnErrorHandler({
                    grunt: grunt,
                    result: result,
                    code: code,
                    error: error,
                })
                reject(error)
                return;
            }

            resolve({
                output: result,
                code: code,
            })
        })
    })
}

const gruntMerge = (grunt, gruntInitConfig, config) => {
    // Define the configuration for all the tasks
    const currentGruntConfig = grunt.config.get();
    const thisGruntConfig = _.merge(gruntInitConfig, config)
    const resultGruntConfig = _.merge(currentGruntConfig, thisGruntConfig)
    grunt.config.merge(resultGruntConfig)
}

const osIndependentPath = (path) => {
    return path.replace(/\\/g, '/')
}

const injectorRelativePathGenerator = (options) => {
    const { filePath } = options;
    let { srcDir } = options;
    srcDir = srcDir.replace(/^\/+/g,'').replace(/\/+$/g,'');
    const relative = osIndependentPath(path.relative(`${cwd}/${srcDir}/`, `${cwd}${filePath}`));
    return relative;
}

const license = () => {

    const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`, 'utf8').toString());

    const license =  `
@license ${pkg.name} v${pkg.version}
  
${pkg.description}

${pkg.homepage}

Copyright (c) ${new Date().getFullYear()} Patrik Laszlo / P3X / Corifeus and contributors.

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.    
`;
   return license
}

module.exports.gruntMerge = gruntMerge
module.exports.gruntSpawnErrorHandler = gruntSpawnErrorHandler;
module.exports.spawn = spawn;
module.exports.commandAddon = commandAddon;
module.exports.osIndependentPath = osIndependentPath;
module.exports.injectorRelativePathGenerator = injectorRelativePathGenerator
module.exports.win32 = win32;
module.exports.license = license

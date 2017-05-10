module.exports = (grunt) => {

    const builder = require('./src');
    const fs = require('fs');
    const mz = require('mz');

    const loader = new builder.loader(grunt);
    loader.js({
        replacer: {
            npmio: true
        }
    });

    grunt.registerTask('generate-folder', 'Generate the actual files'  , function(target) {
        const folder = builder.config.folder;
        const items = {};
        const recursive = (recursiveFolder) => {
            if (typeof(recursiveFolder) === 'string') {
                items[recursiveFolder] = true;
                return;
            }
            if (recursiveFolder instanceof  Array) {
                //items[recursiveFolder.join(', ')] = true;
                return;
            }
            Object.keys(recursiveFolder).forEach((element) => {
                const result = recursiveFolder[element];
                if (result.hasOwnProperty('root')) {
                    items[result.root] = true;
                }
                recursive(result);
            })
        }
        recursive(folder);
        const folders = Object.keys(items);
        let template = `
# Folders
        
Skeleton folders
        
\`\`\`javscript        
`;
        folders.sort().forEach((element) => template += `${element}
`);
        template += '```';
        fs.writeFileSync(`artifacts/readme/builds/folders.md`,template);

    })


    grunt.registerTask('debug', function() {
        const done = this.async();
        mz.child_process.exec('git config --list').then(function (stdout) {
            const result = stdout.join('');
            grunt.log.write(result);
            done();
        })
    })

    grunt.registerTask('default', [/*'debug',*/ 'generate-folder', 'cory-generate-tasks'].concat(builder.config.task.build.js));
//    grunt.registerTask('default', ['debug'].concat(builder.config.task.build.js));
    //grunt.registerTask('run', builder.config.task.run.js);
    grunt.registerTask('run', 'watch:cory-js-test');

}
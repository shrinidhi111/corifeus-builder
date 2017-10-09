const folder = require('../../folder');
const task = require('../../task');

module.exports = (grunt) => {

    const result = {
        copy: {
            'cory-run': {
            },
            'cory-build': {
            }
        },
        jshint: {
            files: folder.files.all,
            options: {
                "asi": true,
                "esversion": 6
            }
        },
        mochaTest: {
            'cory-test-js': {
                src: folder.files.mocha
            },
        },
        mocha_istanbul: {
            'cory-coverage': {
                src: [
//                    `${process.cwd()}/${folder.bin.root}` ,
                    `${process.cwd()}/${folder.src.root}` ,
                    `${process.cwd()}/${folder.test.mocha.root}`,
                ], // the folder, not the files
                options: {
                    mochaOptions: ['--exit'],
                    mask: '**/*.js',
                    includes: [
//                        `${process.cwd()}/${folder.bin.root}**` ,
                        `${process.cwd()}/${folder.src.root}**` ,
                        `${process.cwd()}/${folder.test.mocha.root}**`,
                    ],
                    /*
                    to add more local files, outside directories
                     mochaOptions: [
                         'cli.js'
                     ],
                     */
                    coverageFolder: folder.build.coverage.root,
                    reportFormats: [
                        'clover',
                        'html',
                        'text'
                    ]
                }
            }
        },
        clean: {
            'cory-build': [
                folder.build.root
            ]
        },
        watch: {
            'cory-wait': {
              options: {
                  reload: false
              },
               files: folder.files.all,
                tasks: []
            },
            'cory-js-all': {
                options: {
                    reload: true
                },
                files: folder.files.all,
                tasks: task.watch.jsAll
            },
            'cory-js-test': {
                options: {
                    reload: true
                },
                files: folder.files.all,
                tasks: task.watch.jsTest
            },
            'cory-js-doc': {
                files: folder.files.all,
                tasks: task.watch.doc
            },
        },
        /*
         jsdoc: {
         'cory-dist': {
         src: folder.files.doc,
         options: {
         destination: folder.build.jsdoc.root,
         template : "node_modules/ink-docstrap/template",
         configure : "node_modules/ink-docstrap/template/jsdoc.conf.json",
         plugins: ["node_modules/jsdoc-strip-async-await"]
         }
         }
         },
         */
    }

    return result;
};

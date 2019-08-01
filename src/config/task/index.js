const fs = require('fs');
const folder = require('../folder');

const taskBuildEmpty = [
    'cory-npm',
    'clean',
    'cory-replace',
    'cory:license',
]

const taskBuild = [
    'cory-npm',
    'clean',
    /*, 'jsdoc'*/
    'cory-replace',
    'cory:license',
];
const tasBuildTs = [
    'cory-npm',
    'clean',
    'copy:cory-build-ts',
    'ts:build',
    /*, 'jsdoc'*/
    'cory-replace',
    'cory:license',
];

const taskBuildAngular = [
    'cory-npm',
    'cory-npm-angular',
    'clean',
    'copy:cory-build',
    'cory:license',
];

const taskBuildAngularAot = taskBuildAngular.slice();
//taskBuildAngularAot.push('webpack:cory-build-aot');
taskBuildAngularAot.push('cory-build-aot');

let taskBuildAngularAotJit = taskBuildAngular.slice();
taskBuildAngularAotJit.push('cory-compile-angular');
taskBuildAngularAotJit.push('webpack:cory-build-aot-jit');

//taskBuildAngular.push('webpack:cory-build');
taskBuildAngular.push('cory-build-jit');


taskBuildAngular.push('cory-replace');
taskBuildAngularAot.push('cory-replace');
taskBuildAngularAotJit.push('cory-replace');

const taskTest = [ ];

const runAll = taskBuild.slice();
runAll.push('watch:cory-js-all');

const runTest = taskTest.slice();
runTest.push('watch:cory-doc');


module.exports = {
    build: {
        js: taskBuild,
        angular: taskBuildAngular,
        angularAot: taskBuildAngularAot,
        angularAotJit: taskBuildAngularAotJit,
        ts: tasBuildTs,
        empty: taskBuildEmpty,
    },
    run: {
        angular: [
            'clean',
            'copy:cory-run',
            'cory-npm',
            'webpack-dev-server:cory-run'
        ],
        js: runAll,
        jsTest: [],
//        jsDoc: ['jsdoc', 'watch:cory-doc']
    },
    watch: {
        jsAll: taskBuild,
        jsTest: taskTest,
//        jsDoc: ['jsdoc']
    },
    test: {
        jsTest: taskTest,

    }
};

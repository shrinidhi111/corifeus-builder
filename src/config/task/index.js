const fs = require('fs');
const folder = require('../folder');

const taskBuildEmpty = [
    'cory-npm',
    'clean',
    'cory-replace'
]

const taskBuild = [
    'cory-ensure-protractor',
    'cory-npm',
    'clean',
    'mocha_istanbul:cory-coverage',
    /*, 'jsdoc'*/
    'cory-replace'
];
const tasBuildTs =  [
    'cory-ensure-protractor',
    'cory-npm',
    'clean',
    'copy:cory-build-ts',
    'ts:build',
    'mocha_istanbul:cory-coverage-ts',
    /*, 'jsdoc'*/
    'cory-replace'
];

const taskBuildAngular = [
    'cory-ensure-protractor',
    'cory-npm',
    'cory-npm-angular',
    'clean',
    'copy:cory-build',
];

const taskBuildAngularAot = taskBuildAngular.slice();
taskBuildAngularAot.push('webpack:cory-build-aot');

let taskBuildAngularAotJit = taskBuildAngular.slice();
taskBuildAngularAotJit.push('cory-compile-angular');
taskBuildAngularAotJit.push('webpack:cory-build-aot-jit');

taskBuildAngular.push('webpack:cory-build');
if (fs.existsSync(folder.test.angularProtractor.root)) {
    taskBuildAngular.push('connect:cory-angular');
    taskBuildAngular.push('protractor:cory-angular-chrome');
}
if (fs.existsSync(folder.test.angularKarma.root)) {
    taskBuildAngular.push('karma:cory-angular');
}

taskBuildAngular.push('cory-replace');
taskBuildAngularAot.push('cory-replace');
taskBuildAngularAotJit.push('cory-replace');

const taskTest = [ /** 'jshint', **/ 'mochaTest'];

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
        jsTest: ['mochaTest'],
//        jsDoc: ['jsdoc', 'watch:cory-doc']
    },
    watch: {
        jsAll: taskBuild,
        jsTest: taskTest,
//        jsDoc: ['jsdoc']
    },
    test: {
        jsTest: taskTest,
        angularKarma: [
            'clean',
            'copy:cory-run',
            'cory-npm',
        ]
    }
};

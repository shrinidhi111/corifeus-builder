const folderBuild = 'build/';
const folderBuildCoverage = folderBuild + 'coverage/';
const folderBuildCoverageNode = folderBuild + 'coverage-node/';
const folderBuildJsdoc = folderBuild + 'jsdoc/';
const folderBuildTypedoc = folderBuild + 'typedoc/';
const folderBuildBrowser = folderBuild + 'browser/';
const folderBuildNode = folderBuild + 'node/';

const folderBin = 'bin/';

const folderSrc = 'src/';

const folderTest = 'test/';
const folderTestMocha = folderTest + 'mocha/';
const folderTestAngular = folderTest + 'angular-webpack/';
const folderTestAngularKarma = folderTest + 'angular-karma/';
const folderTestAngularProtractor = folderTest + 'angular-protractor/';

const folderFilesAll = [
    'Gruntfile.js',
    'src/**/*.*',
    'test/**/*.*',
];

const folderFilesMocha = [
    folderTestMocha + '**/*.*'
];

const folderFilesDoc = folderFilesAll;


/**
 * @module Grunt
 * @namespace Grunt/grunt/folder
 */
module.exports = {
    src: {
        root: folderSrc
    },
    bin: {
        root: folderBin
    },
    files: {
        all: folderFilesAll,
        mocha: folderFilesMocha,
        doc: folderFilesDoc
    },
    build: {
        root: folderBuild,
        jsdoc: {
            root: folderBuildJsdoc
        },
        typedoc: {
            root: folderBuildTypedoc
        },
        coverage: {
            root: folderBuildCoverage
        },
        coverageNode: {
            root: folderBuildCoverageNode
        },
        node: {
            root: folderBuildNode
        },
        browser: {
            root: folderBuildBrowser
        }
    },
    test: {
        root: folderTest,
        angularWebpack: {
            root: folderTestAngular
        },
        angularKarma: {
            root: folderTestAngularKarma
        },
        angularProtractor: {
            root: folderTestAngularProtractor
        },
        mocha: {
            root: folderTestMocha
        }
    }
};
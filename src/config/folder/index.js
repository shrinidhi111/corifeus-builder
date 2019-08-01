const folderBuild = 'build/';
const folderBuildBrowser = folderBuild + 'browser/';
const folderBuildNode = folderBuild + 'node/';

const folderBin = 'bin/';

const folderSrc = 'src/';

const folderTest = 'test/';
const folderTestAngular = folderTest + 'angular-webpack/';

const folderFilesAll = [
    'Gruntfile.js',
    'src/**/*.*',
    'test/**/*.*',
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
        doc: folderFilesDoc
    },
    build: {
        root: folderBuild,
        /*
        jsdoc: {
            root: folderBuildJsdoc
        },
        */
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
    }
};

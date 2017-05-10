const should = require('should');
const exec = require('../../../src/task/json2scss/json2scss');

const fs = require('fs');
const mkdirp = require('mkdirp');
const grunt = require('grunt');

describe('src/task/json2scss', () => {
    it('default', () => {

        const folderBuild = 'build/mocha/json2scss/';
        if (!fs.existsSync(folderBuild)) {
            mkdirp.sync(folderBuild);
        }
        const config = {
            files: [
                'test/data/json2scss/*.json'
            ],
            dest: `${folderBuild}json2scss.scss`
        };
        const result = exec(grunt, config);

    });
});
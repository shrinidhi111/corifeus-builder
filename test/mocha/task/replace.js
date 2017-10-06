const should = require('should');
const exec = require('../../../src/task/replace/replace');

const fs = require('mz/fs');
const process = require('process');
const path = require('path');
const mkdirp = require('mkdirp');
const grunt = require('grunt');

describe('src/task/replace', () => {
    it('default', (done) => {
        const folderTemplates = 'test/data/replace/template/';
        const folderBuild = 'build/mocha/replace/';

        const configHeader = {
            header: true,
            replace: `test`,
            files: [
                `${folderBuild}/**/*.`
            ]
        };

        const files = fs.readdirSync(folderTemplates);
        const datas = files.map((file) => {
            return fs.readFileSync(`${folderTemplates}/${file}`).toString();
        })
        if (!fs.existsSync(folderBuild)) {
            mkdirp.sync(folderBuild);
        }
        datas.forEach((data, index) => {
            fs.writeFileSync(`${folderBuild}${files[index]}`, data);
        })
        exec(grunt, configHeader, done);

    });
});
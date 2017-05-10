const should = require('should');
const git = require('../../../src/git');
const exec = require('../../../src/task/npm/npm');
const fs = require('mz/fs');
const process = require('process');
const path = require('path');

describe('src/task/npm/exec', () => {
    it('default', (done) => {

        const fileName = path.resolve(`${process.cwd()}/package.json`);

        let originalData;
        let originalJson;
        const gitData = {
            branch: undefined,
            date: undefined,
            commit: undefined,
            repo: undefined
        };
        Promise.all([
            fs.readFile('package.json'),
            git.branch,
            git.date,
            git.commit,
            git.repo
        ])
        .then((result) => {
            originalData = result[0].toString();
            originalJson = JSON.parse(originalData);
            gitData.branch = result[1];
            gitData.date = result[2];
            gitData.commit = result[3];
            gitData.repo = result[4];
        }).then(() => {
            return exec(fileName);
        }).then((newJson) => {
            console.log(`new name: ${newJson.name}`);
            console.log(`old name: ${originalJson.name}`);
            originalJson.name.should.be.equal(newJson.name);

            console.log(`new version: ${newJson.version}`);
            console.log(`old version: ${originalJson.version}`);
            newJson.version.should.not.equal(originalJson.version);
            return null;
        }).then(() => {
            return fs.writeFile(fileName, originalData);
        }).then(() => {
            return fs.readFile(fileName);
        })
            .then((data) => {
            originalData.should.be.equal(data.toString());
            done();
        })
        .catch((error) => {
            fs.writeFile(fileName, originalData).then(() => {
                done(error)
            }).catch((error2) => {
                done([error, error2]);
            });
        })

    });
});
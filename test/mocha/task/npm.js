const should = require('should');
const git = require('../../../src/git');
const exec = require('../../../src/task/npm/npm');
const fs = require('mz/fs');
const process = require('process');
const path = require('path');

describe('src/task/npm/exec', async () => {
    it('default', async () => {
        const fileName = path.resolve(`${process.cwd()}/package.json`);

        let originalData;
        let originalJson;
        const gitData = {
            branch: undefined,
            date: undefined,
            commit: undefined,
            repo: undefined
        };

        try {
            const result = await Promise.all([
                fs.readFile(fileName),
                git.branch,
                git.date,
                git.commit,
                git.repo
            ])
            originalData = result[0].toString();
            originalJson = JSON.parse(originalData);
            gitData.branch = result[1];
            gitData.date = result[2];
            gitData.commit = result[3];
            gitData.repo = result[4];
            const newJson = await exec(fileName);
            console.log(`new name: ${newJson.name}`);
            console.log(`old name: ${originalJson.name}`);
            originalJson.name.should.be.equal(newJson.name);

            console.log(`new version: ${newJson.version}`);
            console.log(`old version: ${originalJson.version}`);
            newJson.version.should.not.equal(originalJson.version);
            await fs.writeFile(fileName, originalData);
            const data = await fs.readFile(fileName);
            originalData.should.be.equal(data.toString());
        } catch (error) {
            await fs.writeFile(fileName, originalData)
            throw error;
        }
    });
});
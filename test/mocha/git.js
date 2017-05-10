const should = require('should');
const git = require('../../src/git');

describe('src/git', () => {
    it('branch / data / commit / repo', (done) => {

        Promise.all([
            git.commit,
            git.branch,
            git.date,
            git.repo
        ]).then((result) => {
            const commit = result[0];
            const branch = result[1];
            const date = result[2];
            const repo = result[3];

            commit.should.be.a.Number();
            branch.should.be.a.String();
            date.should.be.a.Number();
            repo.should.be.a.String();

            console.log(`commit: ${commit}`);
            console.log(`branch: ${branch}`);
            console.log(`date: ${date}`);
            console.log(`repo: ${repo}`);

            done();
        }).catch((error) => {
            done(error);
        })

    })
})
const exec = require('mz/child_process').exec;

const commit = exec('git rev-list --all --count').then((stdout) => parseInt(stdout.join('').toString()));
const date = exec('git log -1 --format=%at').then((stdout) => parseInt(stdout.join('').toString()));
const branch = exec('git rev-parse --abbrev-ref HEAD').then((stdout) => stdout.join('').toString().trim());
const repo = exec('git config remote.origin.url').then((stdout) => {
    const data = stdout.join('').toString().split('/');
    let repo = data[ data.length -1 ].trim();
    const remove = '.git';
    if (repo.toLowerCase().endsWith(remove)) {
        repo = repo.substr(0, repo.length - remove.length );
    }
    return repo;
});

const settings = {
    "branch": branch,
    "date": date,
    "commit": commit,
    "repo": repo
};


module.exports = settings;


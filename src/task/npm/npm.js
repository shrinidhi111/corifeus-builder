const fs = require('fs').promises;
const git = require('../../git');

module.exports = async (pkgFile) => {

    const result = await Promise.all([
        git.commit,
        git.repo,
        fs.readFile(pkgFile)
    ]);
    const commit = result[0];
    const repo = result[1];
    const pkg = JSON.parse(result[2].toString());
    let version = pkg.version.split('.');

    const date = new Date();
    version[0] = date.getFullYear()

    const previousVersionYear = parseInt(version[0])
    const previousVersionDate = parseInt(version[1])
    const currentMonth = date.getMonth() + 1
    if (currentMonth <= 6) {
        version[1] = 4
    } else {
        version[1] = 10
    }

    const size = 3;
    if (version.length < size) {
        const extend = Array(size - version.length ).fill('0');
        version = version.concat(extend);
    }

    version = version.map((element) => {
        return !Number.isInteger(parseInt(element)) ? '0' : element;
    })

    //console.log('previousVersionDate', previousVersionDate, 'version[1]', version[1])
    if (previousVersionDate === parseInt(version[1]) && previousVersionYear === parseInt(version[0])) {
        version[2] = parseInt(version[2]) + 1
    } else {
        version[2] = 0
    }

    /*
    const subVersion = version[2].split('-');
    subVersion[0] = date.getDate()

    if (subVersion[1] === undefined) {
        subVersion[1] = 0;
    }
    subVersion[1] = parseInt(subVersion[1]) + 1;

    const originalVersion = pkg.version.split('.')
    const originalSubVersion = version[2].split('-');
    if (`${originalVersion[0]}.${originalVersion[1]}.${originalSubVersion[0]}` !== `${version[0]}.${version[1]}.${subVersion[0]}`)  {
        subVersion[1] = 0
    }

    version[2] = subVersion.join('-');
    */

    pkg.version = version.join('.');

    if (!pkg.hasOwnProperty('corifeus')) {
        pkg.corifeus = {};
    }
    const prefix = pkg.corifeus.prefix || '';
    const postfix = pkg.corifeus.postfix || '';

    pkg.name = `${prefix}${repo}${postfix}`;

    // pkg.engines = { "node" : `>=${process.versions.node}` };
    pkg.engines = { "node" : `>=10.13.0` };

    pkg.homepage = `https://pages.corifeus.com/${repo}`;

    pkg.corifeus.nodejs = process.version
    pkg.corifeus.reponame = repo;

    const newPkgFile = JSON.stringify(pkg, null, 4);
    await fs.writeFile(pkgFile, newPkgFile)
    return pkg;
}


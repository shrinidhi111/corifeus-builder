const fs = require('mz/fs');
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

    const size = 3;
    if (version.length < size) {
        const extend = Array(size - version.length ).fill('0');
        version = version.concat(extend);
    }

    version = version.map((element) => {
        return !Number.isInteger(parseInt(element)) ? '0' : element;
    })

    const subVersion = version[2].split('-');
    subVersion[0] = parseInt(subVersion[0]) + 1;

    subVersion[1] = commit + 1;
    if (subVersion[1] === undefined) {
        subVersion[1] = 0;
    }

    version[2] = subVersion.join('-');

    pkg.version = version.join('.');

    if (!pkg.hasOwnProperty('corifeus')) {
        pkg.corifeus = {};
    }
    const prefix = pkg.corifeus.prefix || '';

    pkg.name = `${prefix}${repo}`;

    pkg.engines = { "node" : ">=7.8.0" };

    pkg.homepage = `https://pages.corifeus.com/${repo}`;

    pkg.corifeus.nodejs = process.version

    const newPkgFile = JSON.stringify(pkg, null, 4);
    await fs.writeFile(pkgFile, newPkgFile)
    return pkg;
}


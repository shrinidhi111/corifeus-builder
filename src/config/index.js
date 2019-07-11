const path = require('path');
const _root = path.resolve(process.cwd());

module.exports.root = function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
};

module.exports.folder = require('./folder');
module.exports.task = require('./task');

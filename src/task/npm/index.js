const exec = require('./npm');

module.exports = (grunt) => {
    grunt.registerTask('cory-npm', function() {
        const done = this.async();
        const pkgFile = process.cwd()  + '/package.json';
        exec(pkgFile)
        .then(() => done() )
        .catch((error) => {
            done(error);
        });
    })
}
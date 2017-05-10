const exec = require('./replace');
module.exports = (grunt) => {


    grunt.registerTask('cory-replace', function (target) {

        const config = grunt.config.get('cory-replace');
        if (target !== undefined) {
           exec(grunt, config[target], this.async());
        } else {
            Object.keys(config).forEach((git) => {
                exec(grunt, config[git], this.async());
            });
        }
    })
}
const exec = require('./inject');
module.exports = (grunt) => {

    grunt.registerTask('cory-inject', function (target) {
        const config = grunt.config.get('cory-inject');
        if (target !== undefined) {
            exec(grunt, config[target], this.async());
        } else {
            Object.keys(config).forEach((item) => {
                exec(grunt, config[item], this.async());
            });
        }
    })
}
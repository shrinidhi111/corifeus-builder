const exec = require('./json2scss');
module.exports = (grunt) => {

    grunt.registerTask('cory-json2scss', function (target) {

        const config = grunt.config.get('cory-json2scss');
        if (target !== undefined) {
            exec(grunt, config[target]);
        } else {
            Object.keys(config).forEach((git) => {
                exec(grunt, config[git]);
            });
        }
    })
}
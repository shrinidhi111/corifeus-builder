const fs = require('mz/fs');
const execSync = require('child_process').execSync;

module.exports = (grunt) => {

    grunt.registerTask('cory-ensure-protractor', async function () {
        const done = this.async();
        if (
            fs.existsSync('./node_modules/protractor/bin/webdriver-manager')
            &&

            !fs.existsSync('./node_modules/protractor/node_modules/webdriver-manager/selenium/update-config.json')

            &&
                
            !fs.existsSync('./node_modules/webdriver-manager/selenium/update-config.json')

        ) {
            grunt.log.write('Protractor found on the path')
            try {
                execSync('node ./node_modules/protractor/bin/webdriver-manager update --gecko=false', {
                    stdio: `inherit`
                })
                grunt.log.write('')
                done();
            } catch(e) {
                grunt.log.write('')
                done(e)
            }
        } else {
            if (fs.existsSync('./node_modules/webdriver-manager/selenium/update-config.json')) {
                grunt.log.write('Protractor is already installed')
            } else {
                grunt.log.write('Protractor is not on the path')
            }
            grunt.log.write('')
            done()
        }
    })
}
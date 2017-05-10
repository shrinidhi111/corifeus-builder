const fs = require('fs');

module.exports = (grunt) => {

    grunt.registerTask('cory-generate-tasks', function () {

        const config = grunt.config.get();
        const tasks = [];
        Object.keys(config).forEach((item) => {
            Object.keys(config[item]).forEach((sub) => {
                if (sub === 'options') {
                    return;
                }
                tasks.push(`${item}:${sub}`);
            })
        })
        for(let taskName in grunt.task._tasks) {
            const task = grunt.task._tasks[taskName];
            if (taskName.startsWith('cory')) {
                tasks.push(`${taskName}`);
            }
        }

        const template = `
# Tasks
        
Skeleton tasks
        
\`\`\`javscript        
${tasks.sort().join(`
`)}
\`\`\`
`;
        fs.writeFileSync(`artifacts/readme/builds/tasks.md`,template);

    })
}
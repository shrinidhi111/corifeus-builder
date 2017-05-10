const folder = require('../../folder');
const jsConfig = require('../js');
const _ = require('lodash');

const path = require('path');
const _root = path.resolve(process.cwd());

module.exports = () => {

    const tsSrc = {
        options: require(`${_root}/tsconfig.json`).compilerOptions,
        files: [{
            src: [
                `${folder.src.root}/**/*.ts`,
                `!${folder.src.root}/.baseDir.ts`,
                `!${folder.src.root}/_all.d.ts`,
            ],
            dest: folder.build.node.root
        }]
    };
    const tsBuild = Object.assign({}, tsSrc);
    tsBuild.options.sourceMap = false;

    const config = {
        copy: {
            'cory-build-ts': {
                files: [
                    {
                        src: './package.json',
                        dest: folder.build.root
                    },
                    {
                        src: './data/**/*.*',
                        dest: folder.build.root
                    }

                ]
            }
        },
        ts: {
            run: tsSrc,
            build: tsBuild
        },
    };

    const result = _.merge(config, jsConfig());

    result.mocha_istanbul['cory-coverage-ts'] = {
        src: [
            folder.build.node.root,
            folder.test.mocha.root
        ], // the folder, not the files
        options: {
            mask: '**/*.js',
            coverageFolder: folder.build.coverageNode.root,
            reportFormats: [
                'clover',
                'html',
                'text'
            ]
        }
    };
    throw new Error('Please fix TypeScript module here above (mocha_istanbul settings changed, check js settings, simple)');

//    return result;
}


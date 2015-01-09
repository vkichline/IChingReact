/// <binding BeforeBuild='build' />
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-react");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.initConfig({
        react: {
            files: {
                expand: true,
                cwd: 'jsx',
                src: ['**/*.jsx'],
                dest: 'wwwroot/scripts',
                ext: '.js'
            }
        },
        copy: {
            html: {
                expand: true,
                flatten: true,
                cwd: "assets/html",
                src: "**/*.html",
                dest: "wwwroot/"
            },
            css: {
                expand: true,
                flatten: true,
                cwd: "assets/styles",
                src: "**/*.css",
                dest: "wwwroot/styles"
            },
            img: {
                expand: true,
                flatten: true,
                cwd: "assets/img",
                src: "**/*.*",
                dest: "wwwroot/img"
            },
            react: {
                expand: true,
                flatten: true,
                cwd: "bower_components/react",
                src: "react.js",
                dest: "wwwroot/scripts/"
            },
            js: {
                expand: true,
                flatten: true,
                cwd: "assets/js",
                src: "**/*.js",
                dest: "wwwroot/scripts/"
            }
        }
    });
    grunt.registerTask('build', ['copy', 'react']);
};
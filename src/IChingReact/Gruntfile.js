/// <binding BeforeBuild='build' />
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-react");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.initConfig({
        react: {
            files: {
                expand: true,
                cwd: 'assets',
                src: ['**/*.jsx'],
                dest: 'wwwroot/scripts',
                ext: '.js'
            }
        },
        copy: {
            html: {
                expand: true,
                flatten: true,
                cwd: "assets",
                src: "**/*.html",
                dest: "wwwroot/"
            },
            css: {
                expand: true,
                flatten: true,
                cwd: "assets",
                src: "**/*.css",
                dest: "wwwroot"
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
                cwd: "assets",
                src: "**/*.js",
                dest: "wwwroot/scripts/"
            }
        }
    });
    grunt.registerTask('build', ['copy', 'react']);
};
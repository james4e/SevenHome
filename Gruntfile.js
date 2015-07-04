module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            'app': {
                src: [
                    'js/*.js',
                    'locale/*.js'
                ],
                dest: 'dist/app.js'
            }
        },
        uglify: {
            'app': {
                src: 'dist/app.js',
                dest: 'dist/app.min.js'
            }
        },
        less: {
            app: {
                src: [
                    'stylesheets/app.css'
                ],
                dest: 'dist/app.css'
            }
        },

        copy: {
            index: {
                src: ['index.html'],
                dest: 'dist/tmp/index.html'
            }
        },

        htmlrefs: {
            index: {
                src: 'dist/tmp/index.html',
                dest: 'dist/index.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-htmlrefs');

// the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['concat', 'uglify', 'less', 'copy', 'htmlrefs']);

};
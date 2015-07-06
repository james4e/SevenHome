module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            'app': {
                src: [
                    'js/conf.js',
                    'js/services.js',
                    'js/controllers.js',
                    'js/start-app.js',
                    'js/app.js'
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
                    'stylesheets/*.css'
                ],
                dest: 'dist/app.css'
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['images/**'], dest: 'dist'},
                    {expand: true, src: ['stylesheets/images/**'], dest: 'dist'},
                    {expand: true, src: ['fonts/**'], dest: 'dist'},
                    {expand: true, src: ['data/**'], dest: 'dist'},
                    {expand: true, src: ['pages/**'], dest: 'dist'},
                    {expand: true, src: ['locale/**'], dest: 'dist'},
                    {expand: true, src: ['js/start-app.js'], dest: 'dist'}
                ]
            }
        },

        htmlrefs: {
            dist: {
                /** @required  - string including grunt glob variables */
                src: 'index.html',
                /** @optional  - string directory name*/
                dest: 'dist/index.html',
                options: {
                    version: '0.0.7'
                }
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
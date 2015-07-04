module.exports = function (grunt) {
    var timestamp = new Date().getTime();
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            'app': {
                src: [
                    'lib/**/*.js',
                    'javascripts/*.js',
                    'js/*.js',
                    'locale/*.js'
                ],
                dest: 'dist/app-' + timestamp + '.js'
            }
        },
        uglify: {
            'app': {
                src: 'dist/app-' + timestamp + '.js',
                dest: 'dist/app-' + timestamp + '.min.js'
            }
        },
        less: {
            app: {
                src: [
                    'stylesheets/*.css',
                    'lib/**/*.css'
                ],
                dest: 'dist/app-' + timestamp + '.css'
            }
        },

        htmlrefs: {
            index: {
                src: ['index.html'],
                dest: 'dist/index.html',
                options: {
                    timestamp: timestamp
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-htmlrefs');

// the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['concat', 'uglify', 'less']);

};
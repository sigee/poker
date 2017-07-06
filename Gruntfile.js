module.exports = function (grunt) {
    require('google-closure-compiler').grunt(grunt);

    grunt.initConfig({
        'clean': grunt.file.readJSON('./config/grunt/clean.json'),
        'closure-compiler': grunt.file.readJSON('./config/grunt/closure-compiler.json'),
        'istanbul_check_coverage': grunt.file.readJSON('./config/grunt/istanbul_check_coverage.json'),
        'jsdoc': grunt.file.readJSON('./config/grunt/jsdoc.json'),
        'jslint': grunt.file.readJSON('./config/grunt/jslint.json'),
        'mocha': grunt.file.readJSON('./config/grunt/mocha.json'),
        'mocha_istanbul': grunt.file.readJSON('./config/grunt/mocha_istanbul.json'),
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    // Register task(s).
    grunt.registerTask('test-unit', 'A shorthand for running unit tests with istanbul to retrieve code coverage information.', ['mocha_istanbul']);
    grunt.registerTask('test', 'Runs all of unit tests.', ['test-unit', 'istanbul_check_coverage']);
    grunt.registerTask('build', ['clean', 'jslint', 'test', 'jsdoc', 'closure-compiler']);

    // Default task(s).
    grunt.registerTask('default', ['build']);

    grunt.event.on('coverage', function (lcovFileContents, done) {
        done();
    });

};
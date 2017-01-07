var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var path = require('path');
var pump = require('pump');

gulp.task('default', ['watch']);

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./assets"
        }
    });
});

gulp.task('watch-less', function () {
    return gulp.watch('assets/less/*.less', function (event) {
        console.log('File ' + event.path + ' was ' + event.type);

        gulp.src('assets/less/niat.less')
            .pipe(less({
                paths: [ 'assets/less' ]
            }))
            .pipe(gulp.dest('assets/css'));
    });
});

gulp.task('build', function (cb) {
    pump([
        // uglify js
        gulp.src(['./assets/js/my.js']),
        uglify(),
        gulp.dest('./assets/js'),
        // concat all js
        gulp.src('./assets/js/*.js'),
        concat('script.js'),
        gulp.dest('./assets/dist'),
        // concat all css
        gulp.src('./assets/css/*.css'),
        concat('style.css'),
        gulp.dest('./assets/dist'),
    ], cb);
});
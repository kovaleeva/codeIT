'use strict';

const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      watch = require('gulp-watch');


gulp.task('sass', function () {
  gulp.src('./src/sass/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(stylePath, ['sass']);
});






//js

let jsPath = './src/js/**/*.js';

gulp.task('scripts', function() {
  return gulp.src(jsPath)
    .pipe(watch(jsPath))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('src/dist'));
});



gulp.task('callback', function (cb) {
    watch(jsPath, function () {
        gulp.src(jsPath)
            .pipe(watch(jsPath))
            .on('end', cb);
    });
});

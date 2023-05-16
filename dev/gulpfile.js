'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');

/**
 * Gulp Plugins
 */
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


/**
 * Asset paths.
 */
const srcJS = './assets/js/**/*.js';
const assetsDir = '../assets/';


/**
 * CSS task
 */
gulp.task('buildcss', () => {
    return gulp.src('.../assets/tailwind.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(assetsDir));
});


/**
 * JS task
 */
const jsFiles = [
    srcJS,
];

gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(rename('common.js'))
        .pipe(gulp.dest(assetsDir));
});

gulp.task('buildjs', () => {
    return gulp.src('../assets/common.js')
        .pipe(rename('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(assetsDir));
});


/**
 * Watch task
 */
 gulp.task('watch', () => {
    return gulp.watch(srcJS, gulp.series('js'));
});


/**
 * Build task
 */
gulp.task('build', gulp.series('buildjs'));

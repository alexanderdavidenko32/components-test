var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    del = require('del'),
    jade = require('gulp-jade'),
    template = require('gulp-angular-templatecache'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber');


var config = {
    styles: {
        src: 'client/styles/**/*.scss',
        build: 'client/build/css',
        all: 'styles.css'
    },
    js: {
        src: 'client/js/**/*.js',
        templates: 'client/js/templates',
        build: 'client/build/js',
        all: 'app.js'
    },
    jade: {
        src: 'client/views/**/*.jade',
        index: 'client/views/index.jade',
        templates: 'client/views/templates/**/*.jade',
        build: 'client/build/html'
    }
};

gulp.task('clean', function () {
    del.sync([config.styles.build, config.js.build]);
});

gulp.task('scss', function () {
    return gulp.src(config.styles.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat(config.styles.all))
        .pipe(gulp.dest(config.styles.build));
});

gulp.task('js', ['jade-templates'], function () {
    return gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(concat(config.js.all))
        .pipe(gulp.dest(config.js.build));
});

gulp.task('jade-templates', function () {
    return gulp.src(config.jade.templates)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(template({
            standalone: true
        }))
        .pipe(gulp.dest(config.js.templates));
});

gulp.task('jade-index', function () {
    return gulp.src(config.jade.index)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.jade.build));
});

gulp.task('watch', function () {
    gulp.watch(config.styles.src, ['scss']);
    gulp.watch(config.js.src, ['js']);
    gulp.watch(config.jade.templates, ['jade-templates']);
    gulp.watch(config.jade.index, ['jade-index']);
});

gulp.task('server', function () {
    nodemon({
        script: 'server/index.js',
        watch: 'server/**/*.js',
        delay: 1
    });
});
gulp.task('build', ['clean', 'js', 'scss', 'jade-index']);

gulp.task('default', ['build'], function() {
    gulp.start(['watch', 'server']);
});

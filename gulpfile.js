const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

// Styles task
gulp.task('styles', () => {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/styles'))
});

// Scripts task
gulp.task('js', () => {
    console.log('Doing JS task');
    browserify('./dev/scripts/app.js', {debug: true})
        .transform('babelify', {
            sourceMaps: true,
            presets: ['es2015','react']
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/scripts'))
        .pipe(reload({stream:true}));
});

// move assets to public (compressed)
gulp.task('assets-compressed', () => {
    return gulp.src('./dev/assets/**/*')
        .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
            ]
        })
        ]))
        .pipe(gulp.dest('./public/assets/'))
        .pipe(reload({stream: true}));
});

// move assets to public (uncompressed)
gulp.task('assets-uncompressed', () => {
    return gulp.src('./dev/assets/**/*')
        .pipe(gulp.dest('./public/assets/'))
        .pipe(reload({stream: true}));

});

// Browsersync
gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./dev/scripts/**/*.js',['js']);
    gulp.watch('./dev/**/*.scss',['styles']);
    gulp.watch('./dev/assets/**/*', ['assets-compressed']);
    /* uncomment if you want uncompressed */
    // gulp.watch('dev/assets/**/*', ['assets-uncompressed']);
    gulp.watch('*.html', reload);
    gulp.watch('./public/styles/style.css',reload);
});

//Using compressed assets by default.
gulp.task('default', ['js','bs', 'styles','assets-compressed','watch']);
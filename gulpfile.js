const gulp = require('gulp');
const browsersync = require('browser-sync');
const sass=require('gulp-sass');

// compile sass and inject into browser

gulp.task('sass',function(){
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browsersync.stream());
});

// move JS File to src/js
gulp.task('js',function(){
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browsersync.stream());
});

// watch Sass & Server

gulp.task('serve',["sass"],function(){
    browsersync.init({
        server:"./src"
    });

    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ],['sass']);
    gulp.watch("src/*.html").on('change',browsersync.reload);


});

//Move Fonts Folder to src
gulp.task('fonts',function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

// Move Font Awesome CSS to src/css
gulp.task('fa',function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

gulp.task('default',['js','serve','fa','fonts']);
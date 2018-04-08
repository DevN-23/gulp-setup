const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function(){
    return console.log('Gulp is running...');
});

// Copy All HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize Images
// gulp.task('imageMin', () =>
// 	gulp.src('src/img/*')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/img'))
// );

// Compile Sass
gulp.task('sass', function(){
    gulp.src('src/sass/[^_]*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('innerScss', function(){
    gulp.src(['src/modules/*.scss', 'src/partials/*.scss'])
        .pipe(sass)
});

// Compile pug
gulp.task('pug', function(){
    gulp.src(['src/pug/[^_]*.pug', 'src/pug/includes/[^_]*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['watch']);
gulp.task('build', ['pug', 'sass']);

gulp.task('watch', function(){
    browserSync.init({
        server: './dist'
    });
    // gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/pug/*.pug', ['pug']).on('change', browserSync.reload);
    gulp.watch('src/*.pug', ['pug']).on('change', browserSync.reload);
});

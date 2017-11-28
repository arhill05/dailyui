const gulp = require('gulp');
const sass = require('gulp-sass');
const bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function() {
    gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(bs.reload({stream: true}));
})

gulp.task('default', ['sass', 'browser-sync'], function() {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('*.html').on('change', bs.reload);
})
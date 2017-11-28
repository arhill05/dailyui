const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function() {
    console.log(util.env.project);
    const directory = util.env.project ? `projects/${util.env.project.toString()}` : '';
    bs.init({
        server: {
            baseDir: `./${directory}`
        }
    });
});

gulp.task('sass', function() {
    const directory = util.env.project.toString() ? `projects/${util.env.project.toString()}` : '';
    gulp.src(`${directory}/scss/*.scss`)
    .pipe(sass())
    .pipe(gulp.dest(`${directory}/css`))
    .pipe(bs.reload({stream: true}));
})

gulp.task('default', ['sass', 'browser-sync'], function() {
    const directory = util.env.project ? `projects/${util.env.project}` : '';
    gulp.watch(`${directory}/scss/*.scss`, ['sass']);
    gulp.watch(`${directory}/*.html`).on('change', bs.reload);
})
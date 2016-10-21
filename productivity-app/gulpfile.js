const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('default', ['connect',
                      'watch']);

gulp.task('connect', () => {
  connect.server({
    root: '.',
    livereload: true,
    port: 8888
  });
});

gulp.task('watch', () => {
  gulp.watch('./css/*.css', ['css']);
  gulp.watch('*.html', ['html']);
});

gulp.task('css', () => 
  gulp.src('./css/*.css')
      .pipe(connect.reload())
);

gulp.task('html', () =>
  gulp.src('*.html')
      .pipe(connect.reload())
);
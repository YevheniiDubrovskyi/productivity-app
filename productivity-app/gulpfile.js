const gulp = require('gulp');
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['connect',
                      'watch']);

gulp.task('connect', () => {
  connect.server({
    root: './src',
    livereload: true,
    port: 8888
  });
});

gulp.task('watch', () => {
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/*.html', ['html']);
});

gulp.task('css', () =>
  gulp.src('./src/css/*.css')
      .pipe(autoprefixer({
        cascade: false,
        browsers: ['ie 6-8', 'last 10 versions']
      }))
      .pipe(gulp.dest('./src/css'))
      .pipe(connect.reload())
);

gulp.task('js', () =>
  gulp.src('./src/js/*.js')
      .pipe(connect.reload())
);

gulp.task('html', () =>
  gulp.src('./src/*.html')
      .pipe(connect.reload())
);

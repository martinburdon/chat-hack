var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  return browserify({
    entries: 'public/main.js',
    extensions: ['.js'],
    debug: true
  })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .on('error', (err) => {
      console.log('ERROR (client): ', err);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', ['build'], function () {
  gulp.watch('public/**/*.js', ['build']);
});

gulp.task('default', ['watch']);

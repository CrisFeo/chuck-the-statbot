var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('run-tests', function () {
  return gulp
    .src('spec/*.test.js')
    .pipe(jasmine());
});

gulp.task('default', ['run-tests']);

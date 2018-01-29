const gulp = require('gulp');
const data = require('gulp-data');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const fs = require('fs');
const del = require('del');

gulp.task('html', function () {
  return gulp.src('src/templates/*.pug')
    .pipe(data(() => {
      return JSON.parse(
        fs.readFileSync('src/data/data.json')
      );
    }))
    .pipe(pug())
    .pipe(gulp.dest('dist'))
});

gulp.task('css', function () {
  return gulp.src('src/sass/*.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'))
});

gulp.task('static', function () {
  gulp.src('src/static/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  return del.sync('dist');
});

gulp.task('build', ['clean', 'html', 'css', 'static']);
gulp.task('default', ['build']);
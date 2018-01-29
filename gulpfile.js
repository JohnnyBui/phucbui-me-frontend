const gulp = require('gulp');
const data = require('gulp-data');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const fs = require('fs');

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

gulp.task('default', ['html', 'css']);
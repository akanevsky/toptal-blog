var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var del = require('del');

gulp.task('clean-js', function () {
  return del([
    'public/build/js/*.js'
  ]);
});

gulp.task('clean-css', function () {
  return del([
    'public/build/css/*.css'
  ]);
});

gulp.task('pack-js', ['clean-js'], function () {  
  return gulp.src(['assets/js/vendor/*.js', 'assets/js/main.js', 'assets/js/module*.js'])
    .pipe(concat('bundle.js'))
    .pipe(minify({
        ext:{
            min:'.js'
        },
        noSource: true
    }))
    .pipe(rev())
    .pipe(gulp.dest('public/build/js'))
    .pipe(rev.manifest('public/build/rev-manifest.json', {
      merge: true
    }))
    .pipe(gulp.dest(''));
});

gulp.task('pack-css', ['clean-css'], function () {  
  return gulp.src(['assets/css/main.css', 'assets/css/custom.css'])
    .pipe(concat('stylesheet.css'))
    .pipe(cleanCss())
    .pipe(rev())
    .pipe(gulp.dest('public/build/css'))
    .pipe(rev.manifest('public/build/rev-manifest.json', {
      merge: true
    }))
    .pipe(gulp.dest(''));
});

gulp.task('watch', function() {
  gulp.watch('assets/js/**/*.js', ['pack-js']);
  gulp.watch('assets/css/**/*.css', ['pack-css']);
});

gulp.task('default', ['watch']);

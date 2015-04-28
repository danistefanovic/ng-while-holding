var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Minify JS
gulp.task('scripts', function() {
    gulp.src('src/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
});

// Build Task
gulp.task('build', ['scripts']);

// Default Task
gulp.task('default', ['build']);

var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var pug = require('gulp-pug');
var svgSymbols = require('gulp-svg-symbols')
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

// uglify HTML...
/* Production build tasks. */
gulp.task('build', [`useref`, `images`], function (){
  console.log('Building files');
})

/* TODO: Clean up gulp stuff */

/* Uglify js and concat css. */
gulp.task('useref', ['views'], function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

/* Compress images. */
gulp.task('images', function(){
  return gulp.src('app/images/ui/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulpIf('*.svg', svgSymbols({
      templates: ['default-svg'],
      svgAttrs: {
        class: `svg-icon-lib`, 'aria-hidden': `true`,
        style: `position: absolute;`,
        'data-enabled': true,
      }
    })))
    .pipe(gulp.dest('app/images'))
    .pipe(gulp.dest('dist/images'))
});

/* Preprocess pug files to static html */
gulp.task('views', function buildHTML(done) {
  gulp.src('app/*.pug')
  .pipe(pug({}))
  .pipe(gulp.dest('app/'))
  done();
});

/* Dev server and watchers. */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

/* Process pug files and reload browser. */
gulp.task('views-watch', ['views'], function(done) {
  browserSync.reload();
  done();
})

/* Watch for changes in app files. */
gulp.task('watch', ['views', 'browserSync'], function () {
  gulp.watch('app/**/*.pug', ['views-watch']);
  gulp.watch('app/images/**/*.svg', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/css/**/*.css', browserSync.reload);
})
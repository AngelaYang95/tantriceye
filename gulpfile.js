var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var pug = require('gulp-pug');
var svgSymbols = require('gulp-svg-symbols')
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

/* Production build tasks. */
gulp.task('build', [`useref`, `images`, `audio`], function (){
  console.log('BUILD Complete');
});

/* TODO: Clean up gulp stuff */

/* Uglify js and concat css. */
gulp.task('useref', function() {
  return gulp.src('app/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    // .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

/* Copy images. */
gulp.task('images', [`compress-images`], function(){
  console.log('copying images...')
  return gulp.src('app/images/*.svg')
    .pipe(gulp.dest('dist/images'))
});

/* Compress images. */
gulp.task('compress-images', function(){
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
});

/* Copy audio files. */
gulp.task('audio', function(){
  return gulp.src('app/audio/**/*')
    .pipe(gulp.dest('dist/audio'))
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
});

/* Process pug files and reload browser. */
gulp.task('views-watch', ['views'], function(done) {
  browserSync.reload();
  done();
});

/* Watch for changes in app files. */
gulp.task('watch', ['views', 'browserSync'], function () {
  gulp.watch('app/**/*.pug', ['views-watch']);
  gulp.watch('app/images/**/*.svg', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/css/**/*.css', browserSync.reload);
});

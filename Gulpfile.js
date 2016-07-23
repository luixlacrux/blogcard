'use strict'
const gulp = require('gulp');
const watch = require('gulp-watch')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const data = require('gulp-data')

const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')
const assign = require('lodash.assign')

const stylus = require('gulp-stylus')
const concat =  require('gulp-concat-css')
const minify = require('gulp-minify-css')
const nib = require('nib')

const livereload = require('gulp-livereload')

let opts = {
  entries: './src/client/js/app.js',
  transform: [ babelify ],
  debug: true
}

opts = assign({}, watchify.args, opts)


// Task's Stylus
gulp.task('styl', () => styl())
gulp.task('styl:live', () => styl().pipe(livereload({ start: true })))
gulp.task('styl:watch', () => {
  return gulp.watch(['./src/client/stylus/*.styl','./src/client/stylus/*/*.styl'], ['styl:live'])
})

// Task's Templates
gulp.task('template', () => template())
gulp.task('template:live', () => template().pipe(livereload({ start: true })))
gulp.task('template:watch', () => gulp.watch('./src/client/*.html', ['template:live']))

// Task's JavaScript Files
gulp.task('js', () => rebundle(browserify(opts)))
gulp.task('js:watch', () => {
  let w = watchify(browserify(opts))

  w.on('update', file => {
    console.log('file modified, rebuilding..', file)

    let bundle = rebundle(w).pipe(livereload())
    console.log('rebuild finished')
    return bundle
  })

  return rebundle(w).pipe(livereload({ start: true }))
})

// Task Static's Files
gulp.task('copy', () => {
  return gulp.src('./src/client/assets/**/*')
    .pipe(gulp.dest('./public/assets'));
})



gulp.task('default', ['styl', 'copy', 'template', 'js'])
gulp.task('watch', ['default', 'watching'])

gulp.task('watching', ['styl:watch', 'template:watch', 'js:watch'])

function rebundle (b) {
  return b
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'))
}

function styl () {
  return gulp.src('./src/client/stylus/app.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(concat('app.css'))
    .pipe(minify())
    .pipe(gulp.dest('./public'))
}

function template () {
  return gulp.src('./src/client/*.html')
    .pipe(gulp.dest('./public'))
}



/*gulp.task('build', function () {
  return browserify({
    entries: 'path-to-file',
    transform: [ babelify, jadeify ]
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(gulp.dest('path-to-file-destination'))
})*/


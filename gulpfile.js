const gulp = require("gulp"),
  minifyHTML = require('gulp-minify-html'),
  cleanCSS = require('gulp-clean-css'),
  stylus = require('gulp-stylus'),
  pug = require('gulp-pug'),
  uglify = require('gulp-uglify'),
  browsersync = require("browser-sync")

gulp.task('webserver', () => {
  browsersync.init({
    server: { baseDir: './dist/' },
    open: true,
  })
})

gulp.task('stylus', () => {
  return gulp.src(['./src/styl/*.styl', '!./src/styl/_*.styl'])
    .pipe(stylus())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.stream())
})

gulp.task('pug', () => {
  return gulp.src(['./src/pug/**/*.pug', '!./src/pug/_*.pug'])
    .pipe(pug({ pretty: true }))
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest(`./dist/`))
    .pipe(browsersync.stream())
})

gulp.task('js', () => {
  return gulp.src(('./src/js/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browsersync.stream())
})

gulp.task('assets',() => {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets/'))
    .pipe(browsersync.stream())
})

gulp.task('watch', () => {
  gulp.watch('src/styl/**/*.styl', {cwd:'./'}, ['stylus'])
  gulp.watch('src/pug/**/*.pug', {cwd:'./'}, ['pug'])
  gulp.watch('src/js/**/*.js', {cwd:'./'}, ['js'])
  gulp.watch('src/assets/**/*.*', {cwd:'./'}, ['assets'])
})

gulp.task('default',['webserver', 'watch'])

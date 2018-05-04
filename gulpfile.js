/* eslint-disable */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const concat = require('gulp-concat');npm
const del = require('del');
const htmlreplace = require('gulp-html-replace');

gulp.task('default', function(done){
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
  gulp.watch('./src/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('./src/index.html', gulp.series('html'));
  gulp.watch('./src/index.html', gulp.series('html'));
  browserSync.init({
    server: "./dist"
  });
  browserSync.stream();
  done();
});

gulp.task('js', (done) => {
  gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
    done();
  });

  gulp.task('styles', (done) => {
    gulp.src('./src/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
      done();
  });

  gulp.task('html', (done) => {
    gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
    done();
  });

  gulp.task('img', function(done) {
    gulp.src('./src/img/*.+(jpg|png|svg)')
      .pipe(gulp.dest('./dist/img'))
      .pipe(browserSync.stream());
    done();
  });

  // distribution tasks
  gulp.task('js-dist', (done) => {
    gulp.src(['./src/js/**/*.js'])
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./dist/js'));
    done();
  });

  gulp.task('styles-dist', (done) => {
    gulp.src('./src/sass/**/*.scss')
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./dist/css'));
    done();
  });

  gulp.task('html-dist', (done) => {
    gulp.src('./app/index.html')
      .pipe(htmlreplace({
        'js': 'js/main.min.js'
      }))
      .pipe(gulp.dest('./dist'));
    done();
  });

  gulp.task('img-dist', function(done) {
    gulp.src('./src/img/*.+(jpg|png|svg)')
      // .pipe(imagemin({
      //   progressive: true,
      //   use: [pngquant()]
      // }))
      .pipe(gulp.dest('dist/img'));
    done();
  });

  gulp.task('empty-dist', (done) => {
    del.sync('./dist/*');
    done();
  });

  gulp.task('dist', gulp.series('empty-dist', 'js-dist', 'styles-dist', 'html-dist', 'img-dist', (done) => {
    browserSync.stream();
    done();
  }));

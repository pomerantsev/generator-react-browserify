'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    notifier = require('node-notifier'),
    runSequence = require('run-sequence');

var notify = function (error) {
  notifier.notify({
    title: error.plugin,
    message: error.message
  });
  console.error(error);
};

var basePaths = {
  src: './app/',
  dest: './dist/'
};

var folders = {
  scripts: 'scripts',
  styles: 'styles',
  images: 'images'
};



/* ---------- Scripts ---------- */

gulp.task('jshint', function () {
  return gulp.src(basePaths.src + folders.scripts + '/**/*.{js,jsx}')
    .pipe($.plumber(notify))
    .pipe($.react())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

function getCommonScriptsTransform (opts) {
  return browserify({
    entries: [basePaths.src + folders.scripts + '/app.jsx'],
    debug: opts.debug
  }).transform('reactify')
    .transform('babelify', {stage: 1})
    .bundle();
}

gulp.task('scripts:dev', ['jshint'], function () {
  return getCommonScriptsTransform({debug: true})
    .on('error', function (error) {
      notify(error);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(basePaths.dest + folders.scripts))
    .pipe($.livereload());
});

gulp.task('scripts:prod', ['jshint'], function () {
  return getCommonScriptsTransform({debug: false})
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe(gulp.dest(basePaths.dest + folders.scripts));
});



/* ---------- Styles ---------- */

var autoprefixerOptions = {
  browsers: ['last 2 iOS versions', 'last 5 Android versions', 'last 2 Chrome versions']
};

gulp.task('styles:dev', function () {
  return gulp.src(basePaths.src + folders.styles + '/main.scss')
    .pipe($.plumber(notify))
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(basePaths.dest + folders.styles))
    .pipe($.livereload());
});

gulp.task('styles:prod', function () {
  return gulp.src(basePaths.src + folders.styles + '/main.scss')
    .pipe($.sass())
    .pipe($.autoprefixer(autoprefixerOptions))
    .pipe($.minifyCss())
    .pipe(gulp.dest(basePaths.dest + folders.styles));
});



/* ---------- Images ---------- */

gulp.task('images:dev', function () {
  return gulp.src(basePaths.src + folders.images + '**/*')
    .pipe(gulp.dest(basePaths.dest))
    .pipe($.livereload());
});

gulp.task('images:prod', function () {
  return gulp.src(basePaths.src + folders.images + '**/*')
    .pipe($.imagemin())
    .pipe(gulp.dest(basePaths.dest));
});



/* ---------- Html ---------- */

gulp.task('html', function () {
  return gulp.src(basePaths.src + 'index.html')
    .pipe(gulp.dest(basePaths.dest))
    .pipe($.livereload());
});



/* ---------- Gulpfile ---------- */

gulp.task('gulpfile', function () {
  gulp.src('./gulpfile.js')
    .pipe($.plumber(notify))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
  });



/* ---------- Dev: serve & watch ---------- */

gulp.task('build:dev', [
  'scripts:dev',
  'styles:dev',
  'images:dev',
  'html'
]);

gulp.task('connect:dev', ['build:dev'], function () {
  $.connect.server({
    root: basePaths.dest,
    host: '0.0.0.0',
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', ['connect:dev'], function () {
  $.livereload.listen();

  $.watch(basePaths.src + folders.scripts + '/**/*.{js,jsx}', function () {
    gulp.start('scripts:dev');
  });

  $.watch(basePaths.src + folders.styles + '/**/*.scss', function () {
    gulp.start('styles:dev');
  });

  $.watch(basePaths.src + folders.images + '/**/*', function () {
    gulp.start('images:dev');
  });

  $.watch(basePaths.src + 'index.html', function () {
    gulp.start('html');
  });

  $.watch('./gulpfile.js', function () {
    gulp.start('gulpfile');
  });
});

gulp.task('default', [
  'watch'
]);



/* ---------- Prod: build & serve ---------- */

gulp.task('clean:dist', function () {
  return gulp.src(basePaths.dest)
    .pipe($.clean());
});

gulp.task('build:prod', function (callback) {
  runSequence(
    'clean:dist',
    [
      'scripts:prod',
      'styles:prod',
      'images:prod',
      'html'
    ],
    callback
  );
});

gulp.task('connect:prod', ['build:prod'], function () {
  $.connect.server({
    root: basePaths.dest,
    host: '0.0.0.0',
    port: 9000,
    keepalive: true
  });
});

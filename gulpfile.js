var gulp            = require('gulp'),
    minify          = require('gulp-minify-css'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    cmq             = require('gulp-combine-mq'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    autoprefixer    = require('autoprefixer'),
    del             = require('del'),
    concat          = require('gulp-concat'),
    browserify      = require('browserify'), 
    source          = require('vinyl-source-stream'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglifyjs'),
    buffer          = require('vinyl-buffer'),
    fileinclude     = require('gulp-file-include'),
    postcss         = require('gulp-postcss'),
    glob            = require('glob'),
    es              = require('event-stream'),
    pug             = require('gulp-pug'),
    compress        = require('compression');

var config = {
  scss    :[ 'app/scss/**/*.scss' ],
  css     :[ 'app/css/' ],
  html    :[ 'app/pages/**/*.pug' ],
  jsWork  :[ 'app/_js/*.js' ],
  jsDist  :[ 'app/js/' ],
  build   :[ 'build/' ],
  src     :[ 'app/' ]
};

gulp.task('css',function(){
  return gulp.src(config.scss)
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(postcss([autoprefixer('last 10 version')]))
    .pipe(gulp.dest(''+config.css+''))
    .pipe(cmq({
      beautify: false
    }))
    .pipe(reload({stream:true}));
});

gulp.task('views', function() {
 return gulp.src('app/pages/*.pug', {basedir: 'app'})
  .pipe(pug())
  .pipe(gulp.dest('app/'))
  .pipe(reload({stream:true}));
});

gulp.task('makejs', function(done) {
    glob('./app/_js/*.js', {base: '_js'}, function(err, files) {
        if(err) done(err);
        var tasks = files.map(function(entry) {
          console.log(entry)
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    dirname: '',
                    extname: '.bundle.js'
                }))
                .pipe(buffer())
                .pipe(gulp.dest('./app/js'));
            });
        es.merge(tasks).on('end', done);
    })
});

gulp.task('browserSync', function() {
  browserSync({
    notify: false,
    ghostMode: false,
    port: 1337,
    server: {
      baseDir: config.src,
      middleware: [compress()]
    }
  });
});

gulp.task('build:create', function(){
  return gulp.src(config.src+'**/*')
    .pipe(gulp.dest(''+config.build+''));
});

gulp.task('build:clean',['build:create'], function(){
  return del(['build/bower_components/',
              'build/scss/',
              'build/css/!(*.min.css)',
              'build/js/!(*.min.js)'
            ]);
});

gulp.task('build:start', function() {
  browserSync({
    server: {
      baseDir: config.build
    }
  });
});

gulp.task('build', ['build:create', 'build:clean']);

gulp.task ('watch', function(){
  gulp.watch(config.scss, ['css']);
  gulp.watch(config.html, ['views']);
  gulp.watch(config.jsWork, ['makejs']);
});

gulp.task('default', ['watch','makejs', 'browserSync','css','views']);
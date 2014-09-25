var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

// banner setting
var pkg  = require('./package.json');
var date = new Date();
var yyyy = date.getFullYear();
var jsbanner = ['/**',
  ' * <%= pkg.title %> - v<%= pkg.version %>',
  ' *',
  ' * <%= pkg.homepage %>',
  ' *',
  ' * Copyright ' + yyyy + ', <%= pkg.author.name %> (<%= pkg.author.url %>)',
  ' * Released under the GNU General Public License v2 or later',
  ' */',
  ''].join('\n');

// javascript
gulp.task('js', function() {
  gulp.src('js/{%= file_name %}.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
});

// Style sheet language
gulp.task('css', function() {
  gulp.src('_sass/*.scss')
    .pipe($.compass({
      sass:      '_sass',
      css:       'css',
      image:     'images',
      style:     'expanded',
      relative:  true,
      comments:  false,
      sourcemap: true
    }))
    .pipe($.rename('style.css'))
    .pipe($.csscomb())
    .pipe($.cssbeautify({
      indent: '	'
    }))
    .pipe(gulp.dest(''))
});

// Only Master branch
gulp.task('package', function() {

  gulp.src('js/{%= file_name %}.js')
    .pipe($.concatUtil('{%= file_name %}.min.js'))
    .pipe($.uglify({mangle: ['jQuery']}))
    .pipe($.concatUtil.header(jsbanner, { pkg : pkg }))
    .pipe(gulp.dest('./js'))

  gulp.src('css/{%= file_name %}.css')
    .pipe($.rename('{%= file_name %}.min.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('./css'))

  gulp.src('inc/manage_scripts_styles.php')
    .pipe($.replace(/{%= file_name %}.js/g, '{%= file_name %}.min.js'))
    .pipe($.replace(/style.css/g, 'css/{%= file_name %}.min.css'))
    .pipe(gulp.dest('./inc'))

});

// Only Master branch
gulp.task('image', function() {

  gulp.src('images/{,*/}*.{png,jpg,gif,svg}')
    .pipe($.image())
    .pipe(gulp.dest('./images'))

});

// watch
gulp.task('watch', function () {
  gulp.watch('js/{%= file_name %}.js', ['js']);
  gulp.watch('_sass/{,*/}*.scss', ['css']);
});


// default task
gulp.task('default',['js','css']);

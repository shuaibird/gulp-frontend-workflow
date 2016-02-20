//npm install --save-dev #{node_module}
var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');



var sassSources = ['components/sass/style.scss'];
var coffeeSources = ['components/coffee/tagline.coffee'];
var scriptSources = ['components/scripts/*.js'];



//sources for liveReload
var htmlSources = ['builds/development/*.html'];
var cssSources = ['builds/development/css/*.css'];
var jsSources = ['builds/development/js/*.js'];
var jsonSources = ['builds/development/js/*.json'];
var allSources = htmlSources.concat(cssSources).concat(jsSources).concat(jsonSources);

gulp.task('server', function() {
	connect.server({
		root: ['builds/development'],
		livereload: true
	});
});
gulp.task('liveReload', function() {
	gulp.src(allSources)
		.pipe(connect.reload());
});

//coffee to js(inside the components dir)
gulp.task('coffee', function() {
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'));
});

//concat all js components(inculde the required libraries/frameworks) into one js files
gulp.task('concat', function() {
	gulp.src(scriptSources)
		.pipe(concat('script.js'))
		.pipe(browserify())  //to automatically concat libraries
		.pipe(gulp.dest('builds/development/js'));
});

//sass to css
gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sourcemap: true,
			sass: 'components/sass',
			css: 'builds/development/css',
			style: 'expanded'
		}).on('error', gutil.log));
});

//autoprefixer for css in development version
gulp.task('autoprefixer', function() {
	gulp.src(cssSources)
		.pipe(autoprefixer())
		.pipe(gulp.dest('builds/development/css'));
});

//watch for all changes
gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(scriptSources, ['concat']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(allSources, ['liveReload']);
});

//gulp
gulp.task('default', ['coffee', 'concat', 'compass', 'autoprefixer', 'server', 'liveReload', 'watch']);



//Minify
var htmlMinify = require('gulp-htmlmin');
var cssMinify = require('gulp-cssnano');
var jsMinify = require('gulp-uglify');
var jsonMinify = require('gulp-jsonminify');

gulp.task('htmlMinify', function() {
	gulp.src('builds/development/*.html')
		.pipe(htmlMinify({collapseWhitespace: true}))
		.pipe(gulp.dest('builds/production'));
});
gulp.task('cssMinify', function() {
    gulp.src('builds/development/css/*.css')
        .pipe(cssMinify())
        .pipe(gulp.dest('builds/production/css'));
});
gulp.task('jsMinify', function() {
	gulp.src('builds/development/js/*.js')
		.pipe(jsMinify())
		.pipe(gulp.dest('builds/production/js'));
});
gulp.task('jsonMinify', function() {
	gulp.src('builds/development/js/*.json')
		.pipe(jsonMinify())
		.pipe(gulp.dest('builds/production/js'));
});
//Put all the compression tasks together
gulp.task('minify', ['htmlMinify', 'cssMinify', 'jsMinify', 'jsonMinify']);


//Images auto compress(optional, be careful)
var imgMinify = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
gulp.task('imgMinify', function() {
	//** for any folders, *.* for any files inside the folder
	gulp.src('builds/development/images/**/*.*')
		.pipe(imgMinify({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],  //for SVG
			use: [pngcrush()]
		}))
		.pipe(gulp.dest('builds/production/images'));
});
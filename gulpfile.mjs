import gulp from 'gulp';
import csso from 'gulp-csso';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import cp from 'child_process';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import replace from 'gulp-string-replace';
import rename from 'gulp-rename';


import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/*
 * Build the Jekyll Site
 * runs a child process in node that runs the jekyll commands
 */
gulp.task('jekyll-build', function (done) {
	return cp.spawn(jekyllCommand, ['build'], { stdio: 'inherit' })
		.on('close', done);
});

/*
 * Rebuild Jekyll & reload browserSync
 */
gulp.task('jekyll-rebuild', gulp.series(['jekyll-build'], function (done) {
	browserSync.reload();
	done();
}));

/*
 * Build the jekyll site and launch browser-sync
 */
gulp.task('browser-sync', gulp.series(['jekyll-build'], function (done) {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
	done()
}));

/*
* Compile and minify sass
*/
gulp.task('sass', function () {
	return gulp.src('src/styles/**/*.{scss,css}')
		.pipe(plumber())
		.pipe(sass())
		.pipe(csso())
		.pipe(gulp.dest('assets/css/'))
});

/*
* Compile fonts
*/
gulp.task('fonts', function () {
	return gulp.src('src/fonts/**/*.{ttf,woff,woff2,svg,eot}')
		.pipe(plumber())
		.pipe(rename(function(path) {
			console.log(path)
			path.dirname = '';
		}))
		.pipe(gulp.dest('assets/fonts/'))
});

/*
 * Minify images
 */
gulp.task('imagemin', function () {
	return gulp.src('src/img/**/*.{jpg,png,gif}')
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/img/'))
});

/**
 * Compile and minify js
 */
gulp.task('js', function () {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
});

/**
 * Copy node-module sources to src
 */
function copyFiles(source, destination) {
	return gulp.src(source)
		.pipe(gulp.dest(destination));
};
gulp.task('node-src', async function () {
	await Promise.all([
		gulp.src('node_modules/@fortawesome/fontawesome-free/scss/*.scss')
			.pipe(replace('../webfonts', '../fonts'))
			.pipe(gulp.dest('src/styles/fontawesome/')),
		copyFiles('node_modules/@fortawesome/fontawesome-free/js/{fontawesome.js,regular.js,solid.js,brands.js,v4-shims.js,conflict-detection.js}', 'src/js/fontawesome/'),
		copyFiles('node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff2}', 'src/fonts/fontawesome/'),
		copyFiles('node_modules/normalize.css/*.css', 'src/styles/normalize.css/'),
		copyFiles('node_modules/devicon/fonts/*', 'src/fonts/devicon/'),
		gulp.src('node_modules/devicon/devicon.min.css')
			.pipe(replace('fonts/devicon', '../fonts/devicon'))
			.pipe(gulp.dest('src/styles/devicon/')),
		copyFiles('node_modules/particles.js/particles.js', 'src/js/particle.js/'),
		copyFiles('node_modules/sweet-scroll/sweet-scroll.min.js', 'src/js/sweet-scroll/')
	])
});

gulp.task('watch', function () {
	gulp.watch('src/styles/**/*.{scss,css}', gulp.series(['sass', 'jekyll-rebuild']));
	gulp.watch('src/js/**/*.js', gulp.series(['js', 'jekyll-rebuild']));
	gulp.watch('src/fonts/**/*.{tff,woff,woff2}', gulp.series(['fonts']));
	gulp.watch('src/img/**/*.{jpg,png,gif}', gulp.series(['imagemin']));
	gulp.watch(['*html', '_includes/*html', '_layouts/*.html'], gulp.series(['jekyll-rebuild']));
});

gulp.task('default', gulp.series(['node-src', 'js', 'sass', 'fonts', 'browser-sync', 'watch']));

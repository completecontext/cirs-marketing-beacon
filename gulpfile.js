const { src, dest, watch } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCss = require('gulp-cssmin');

function css() {
	return src('assets/css/src/main.scss')
		.pipe(sass())
		.pipe(minifyCss())
		.pipe(dest('./assets/css'))
}

exports.css = css;
exports.default = function() {
	watch(['assets/css/src/*.scss', 'assets/css/src/*/*.scss'], css);
};
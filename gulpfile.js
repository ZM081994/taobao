var gulp = require("gulp");

//sass
var sass = require("gulp-sass");

//压缩css
var clean = require("gulp-clean-css");

//合并文件
var concant = require("gulp-concat");

//压缩html
var htmlmin = require("gulp-htmlmin");

//压缩js
var js = require("gulp-uglify");

//起服务
var server = require("gulp-webserver");
gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
});

gulp.task("devServer", function() {
    return gulp.src("src")
        .pipe(server({
            port: 3300,

        }))
});

gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"))
});
gulp.task("default", gulp.series("devSass", "watch"));
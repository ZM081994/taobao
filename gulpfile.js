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
var uglify = require("gulp-uglify");
//es6转es5
var babel = require("gulp-babel");

var url = require("url");
var fs = require("fs");
var path = require("path");
var data = require("./data/shopping")

//起服务
var server = require("gulp-webserver");
gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/css"))
});

function serverFun(serverPath) {
    return gulp.src("src")
        .pipe(server({
            port: 3300,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname);

                if (pathname === "/favicon.ico") {
                    return res.end();
                }
                if (pathname === "/api/shopping") {
                    var name = url.parse(req.url, true).query.name;
                    var newArr = [];
                    for (var i in data) {
                        if (name === i) {
                            data[i].forEach(function(file) {
                                newArr.push(file);
                            })
                        }
                    }
                    res.end(JSON.stringify({ code: 1, msg: newArr }))

                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
}
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"))
});

gulp.task("devServer", function() {
    return serverFun("src");
})

gulp.task("dev", gulp.series("devSass", "devServer", "watch"))

//js
gulp.task("js", function() {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))

    .pipe(uglify())
        .pipe(gulp.dest("./bulid/js"))
})

//html
gulp.task("dHtmlmin", function() {
    return gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./bulid"))
})


//css
gulp.task("dCss", function() {
    return gulp.src("./src/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./bulid/css"))
})

gulp.task('bServer', function() {
    return serverFun('bulid')
})

//线上
gulp.task("bulid", gulp.series("js", "dHtmlmin", "dCss"))
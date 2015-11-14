/// <binding Clean='clean' ProjectOpened='watch' />
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    debug = require("gulp-debug"),
    ts = require('gulp-typescript'),
    project = require("./project.json");

var paths = {
    webroot: "./" + project.webroot + "/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.tsResult = paths.webroot + "./ts/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task("watch", function () {
    gulp.watch(paths.css, ["min"]);
})




gulp.task('typescript:Build', function () {
    return gulp.src('ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            target: "es5",
            module: "system",
        }))
        .pipe(gulp.dest('wwwroot/js'));
});



//https://www.npmjs.com/package/gulp-typescript
//http://weblogs.asp.net/dwahlin/creating-a-typescript-workflow-with-gulp
var tsProject = ts.createProject('tsconfig.json');

//gulp.task('typescript:Build', function () {
//    var tsResult = tsProject.src() // instead of gulp.src(...) 
//        .pipe(ts(tsProject));

//});


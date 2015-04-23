var gulp = require("gulp"),
    mocha = require('gulp-mocha');

gulp.task("default", function(){
	console.log("Gulp initiating");
});

gulp.task('mocha', function(){
    return gulp.src('test/*', {read:false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function(){
    gulp.watch(['test/*','src/*'], ['mocha']);
});

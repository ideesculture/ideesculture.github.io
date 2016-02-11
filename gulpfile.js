var gulp = require('gulp'),
    sass = require('gulp-sass')
notify = require("gulp-notify")
bower = require('gulp-bower');

var config = {
    sassPath: './assets/sass',
    bowerDir: './bower_components'
}

// Bootstrap scss source
var bootstrapSass = {
    in: './bower_components/bootstrap-sass'
};

gulp.task('configuring bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('copying fonts', function() {
    gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./assets/fonts'));
	gulp.src(config.bowerDir + '/ubuntu-fontface/fonts/**.*')
        .pipe(gulp.dest('./assets/fonts'));
});

gulp.task('copying javascript assets', function(){
    gulp.src([
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
        'bower_components/jquery-backgroundpos/src/jquery.backgroundpos.min.js',
    ])
    .pipe(gulp.dest('assets/js'));
});

gulp.task('compiling sass stylesheets', function() {
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precison: 3,
            errLogToConsole: true,
            includePaths: [
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/fontawesome/scss',
				config.bowerDir + '/ubuntu-fontface',
            ]
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('assets/css'));
});

// Rerun the task when a file changes
gulp.task('sass:watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

gulp.task('default', ['configuring bower','copying fonts','copying javascript assets', 'compiling sass stylesheets']);
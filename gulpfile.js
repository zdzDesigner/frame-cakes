var gulp = require('gulp')
var concat = require('gulp-concat')
var babel = require('gulp-babel')
var clean = require('del')



var scripts =  {
    src: 'src/**/*.js',
    dest:'lib'
}

function build(){
    return gulp.src(scripts.src)
        .pipe(babel({
            presets: ["babel-preset-es2015","stage-0"],
            plugins: ['transform-runtime',"transform-flow-strip-types"]
        }))
        .pipe(gulp.dest(scripts.dest))
}

function watch() {
  clean.sync(scripts.dest)
  build()
  gulp.watch(scripts.src, build);
}


gulp.task('default', watch)
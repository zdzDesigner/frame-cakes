var gulp = require('gulp')
var concat = require('gulp-concat')
var through = require('through2')
var babelcore = require('babel-core')
var clean = require('del')



var scripts =  {
    src: 'src/**/*.js',
    dest:'lib'
}

function build(){
    return gulp.src(scripts.src)
        .pipe(taskBabel({
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

function taskBabel (config){
    return through.obj(function (chunk, enc, cb) {
    // console.log(Object.getOwnPropertyNames(chunk),chunk.contents.toString())
    var res = babelcore.transform(chunk.contents.toString(),config)
        chunk.contents = new Buffer(res.code)
    cb(null, chunk)
  })
}


gulp.task('default', watch)

//引入gulp
var gulp=require('gulp');

//task() 布置任务
//参数一：任务名称   参数二：数组，依赖任务（可选）  参数三：回调函数

//默认任务,任务的合并
gulp.task('default',['say','dance'],function(){
	console.log('default任务完成啦');
});

//其他任务
gulp.task('say',['dance'],function(){
	console.log('say任务完成啦');
});

//其他任务
gulp.task('dance',function(){
	console.log('dance任务完成啦');
});


//src()  源文件路径     dest（） 目标路径     pipe() 管道

//拷贝任务：拷贝文件
gulp.task('copyhtml',function(){
	gulp.src('src/index.html')
		.pipe(gulp.dest('dest'));
});

//任务：拷贝lib所有文件到dest下面

gulp.task('copyall',function(){
	gulp.src('lib/*/**')
		.pipe(gulp.dest('dest/all'));
});


//任务：监听src的index.html  如果有更改，就及时更替dest里面的index。html文件
//watch()

//参数一：监听文件  参数二：数组，任务名称

gulp.task('watchhtml',function(){
	gulp.watch('src/index.html',['copyhtml']);
});


//使用插件

//布置任务：将scss编译css

var sass=require('gulp-sass');

gulp.task('sass',function(){
	return gulp.src('lib/css.scss')
			   .pipe(sass())
			   .pipe(gulp.dest('lib'));
});

gulp.task('watchsass',function(){
	gulp.watch('lib/css.scss',['sass']);
});


//布置任务：压缩css文件
var cssmin=require('gulp-cssmin');

gulp.task('cssmin',function(){
	return gulp.src('lib/index.css')
			   .pipe(cssmin())
			   .pipe(gulp.dest('lib'));
});

//布置任务：重命名
var rename=require('gulp-rename');
gulp.task('cssrename',function(){
	return gulp.src('lib/index.css')
			   .pipe(cssmin())
			   .pipe(rename('css.min.css'))
			   .pipe(gulp.dest('lib'));
});

//布置任务：压缩js
var jsmin=require('gulp-uglify');

gulp.task('jsmin',function(){
	return gulp.src('lib/ajax.js')
			   .pipe(jsmin())
			   .pipe(rename('ajax.min.js'))
			   .pipe(gulp.dest('lib'));
});

//压缩图片

var imagemin=require('gulp-imagemin');

gulp.task('imagemin',function(){
	return gulp.src('image/*')
			   .pipe(imagemin())
			   .pipe(gulp.dest('imgmin'));
});

//合并文件

var concat=require('gulp-concat');

gulp.task('concat',function(){
	return gulp.src(['src/*.js','lib/*.js'])
			   .pipe(concat('all.js'))
			   .pipe(gulp.dest('dest'));
});


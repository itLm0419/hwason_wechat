'use strict'

import gulp from 'gulp';
import watch from 'gulp-watch';
import babel from 'gulp-babel';


gulp.task('transform2', () => {
    return gulp.src('server/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/server'));
});

// gulp.task('watch', () => {
//     return gulp.src(['**/*.js','!node_modules','!node_modules/**/*','!public','!public/**/*','!runtime','!runtime/**/*','!static','!static/**/*','!views','!views/**/*','!.babelrc','!app.js','!gulpfile.babel.js','!package.json'])
//         .pipe(watch(['**/*.js','!node_modules','!node_modules/**/*','!public','!public/**/*','!runtime','!runtime/**/*','!static','!static/**/*','!views','!views/**/*','!.babelrc','!app.js','!gulpfile.babel.js','!package.json'], {
//             verbose: true
//         }))
//         .pipe(babel())
//         .pipe(gulp.dest('runtime'));
// });

gulp.task('watch', () => {
    return gulp.src('server/**/*.js')
        .pipe(watch('server/**/*.js', {
            verbose: true
        }))
        .pipe(babel())
        .pipe(gulp.dest('dist/server'));
});

gulp.task('default', () => {
    gulp.start('transform2');
});

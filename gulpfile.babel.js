"use strict";

import gulp from "gulp";
import browserSync from "browser-sync";
import sass from "gulp-sass";
import autoprefixer from "autoprefixer";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import webpack from "webpack-stream";

sass.compiler = require("node-sass");

const errorHandler = err => {
  notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString()
  })(err);
};

gulp.task("assets", function() {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets/"));
});

gulp.task("html", function() {
  return gulp
    .src("./src/content/**/*.html")
    .pipe(plumber(errorHandler))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("pwa", function() {
  return gulp
    .src("./src/pwa/**/*")
    .pipe(gulp.dest("./dist/"));
});

gulp.task("js", function() {
  return gulp.src('src/js')
  .pipe(
    plumber({
      errorHandler: function(err) {
        notify.onError({
          title: `Gulp error in ${err.plugin}`,
          message: err.toString()
        })(err);
      }
    })
  )
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('dist/js'));
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(
      plumber({
        errorHandler: function(err) {
          notify.onError({
            title: `Gulp error in ${err.plugin}`,
            message: err.toString()
          })(err);
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      postcss([
        autoprefixer({ grid: true, browsers: ["> 5%", "last 4 versions"] })
      ])
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task(
  "serve",
  gulp.series("sass", "html", "js", "assets", "pwa", function() {
    browserSync.init({
      server: "./dist",
      open: true // set to false to disable browser autostart
    });
    gulp.watch("src/scss/**/*", gulp.series("sass"));
    gulp.watch("src/content/**/*.html", gulp.series("html"));
    gulp.watch("src/pwa/**/*", gulp.series("pwa"));
    gulp.watch("src/js/*.js", gulp.series("js"));
    gulp.watch("src/assets/**/*", gulp.series("assets"));
    gulp.watch("dist/**/*").on("change", browserSync.reload);
  })
);

gulp.task("build", gulp.series("sass", "html", "js", "assets", "pwa"));
gulp.task("default", gulp.series("serve"));

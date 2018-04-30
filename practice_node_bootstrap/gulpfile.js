var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// 這三個require是指從node_module抓出這三個套件

gulp.task('sass',function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// 回傳那兩個位置的scss後，呼叫sass這function，然後，把這兩個位置的scss透過sass()轉成css
// 再來，gulp.dest("src/css")意思就是轉完的css檔，放進src/css裡
// 最後，透過browserSync這套件，實現及時css編譯儲存後顯示
// browserSync就是個即時顯示更改後的CSS的套件，可裝可不裝

gulp.task('js',function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

gulp.task('serve',['sass'],function(){
    browserSync.init({
        server:"*/src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
    gulp.watch("src/*.html").on('change',browserSync.reload);
    // 這兩行的意思就是，當css有所改變時，browserSync會去這兩個地方重新載入scss檔
});

gulp.task('default',['js','serve']);
//執行gulp時，除了自動開啟瀏覽器，也到gulp.task('js')那把src裡的東西丟到我們的專案裡執行
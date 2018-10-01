var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var del = require('del');
var fs = require('fs');
var runSequence = require('run-sequence');
var through = require('through2');
var chmod = require('gulp-chmod');
var less = require('gulp-less');
var merge = require('merge-stream');
var themePrefix = require('./src/tools/gulp-theme-prefix');
var copydir = require('copy-dir');

const replaceInFiles = require('replace-in-files');

const rootFolder = path.join(__dirname);
const srcFolder = path.join(__dirname, 'src');
const distFolder = path.join(rootFolder, 'dist');
const nodeModulesFolder = path.join(rootFolder, 'node_modules');
const assetsFolder = path.join(distFolder, 'assets');

// Hack for tinyMce theme
const replaceInFilesOptions = {
    files: nodeModulesFolder + '/tinymce/themes/modern/theme.js',
    from: /return fontFamily.replace/g,  // string or regex
    to: "return ((typeof fontFamily === 'string' || fontFamily instanceof String) ? fontFamily : \"\").replace",
    optionsForFiles: { // default
        "ignore": [
            //"**/node_modules/**"
        ]
    },
    saveOldFile: false,
    encoding: 'utf8',
    onlyFindPathsWithoutReplace: false, // default
    returnPaths: true, // default
    returnCountOfMatchesByPaths: true // default
};
const toLowerInFilesOptions = {
    files: nodeModulesFolder + '/tinymce/themes/modern/theme.js',
    from: "(item.value.toLowerCase() === fontFamily.toLowerCase())", // string or regex
    to: "(fontFamily != undefined && item.value.toLowerCase() === fontFamily.toLowerCase())",
    optionsForFiles: { // default
        "ignore": [
            //"**/node_modules/**"
        ]
    },
    saveOldFile: false,
    encoding: 'utf8',
    onlyFindPathsWithoutReplace: false, // default
    returnPaths: true, // default
    returnCountOfMatchesByPaths: true // default
};

gulp.task('clean:i18n-assets', () => {
    return deleteFolders(`${assetsFolder}/i18n`);
})

// copy the language assets from all @primavera modules (@primavera/{MODULE}/assets/i18n)
gulp.task('copy:i18n-assets', () => {
    let primaveraModulesPath = `${nodeModulesFolder}/@primavera`;
    let dirs = fs.readdirSync(primaveraModulesPath);
    let dirAssetsPath = [];

    for (let index in dirs) {
        let moduleFolder = dirs[index];
        let assetsPath = `${nodeModulesFolder}/@primavera/${moduleFolder}/assets/i18n/**/*.lang.json`;
        dirAssetsPath.push(assetsPath);
    }

    return gulp.src(dirAssetsPath)
        .pipe(chmod(666))
        .pipe(gulp.dest(`${assetsFolder}/i18n`));
});

// handle assets tasks
gulp.task('copy:assets', runSequence('clean:i18n-assets', 'copy:i18n-assets'));

// the login styles need same files on ./dist folder to work properly
gulp.task('copy:assets_to_login', () => {

    let loginStyle = gulp.src('./src/themes/corejs/corejs.login.css')
        .pipe(gulp.dest('./dist'));

    // copy product svg images
    let productSvgImages = gulp.src('./src/themes/Images/*.svg')
        .pipe(gulp.dest('./dist'));

    // copy product jpg|png images
    let productJpgPngImages = gulp.src('./src/themes/Images/*.{jpg,jpeg,png}')
        .pipe(gulp.dest('./dist'));

    // copy framework icons
    let fwIconsStyle = gulp.src('./src/themes/corejs/core/fonts/*.*')
        .pipe(gulp.dest('./dist/core/fonts'));

    let fwIconsFont = gulp.src('./src/themes/corejs/core/fonts/fonts/*.*')
        .pipe(gulp.dest('./dist'));

    // copy fonts
    let corejsFonts = gulp.src('./src/themes/corejs/fonts/*.*')
        .pipe(gulp.dest('./dist'));

    let corejsOpenSansFonts = gulp.src('./src/themes/corejs/core/fonts/open-sans/*.*')
        .pipe(gulp.dest('./dist'));

    return merge(loginStyle, productSvgImages, productJpgPngImages, fwIconsStyle, fwIconsFont, corejsFonts, corejsOpenSansFonts);
});

// delete previouse coreJS files
gulp.task('clean:styles_corejs', () => {

    return del([
        `./src/themes/corejs/core`,
        './src/themes/corejs/bootstrap-colorpicker',
        './src/themes/corejs/fonts',
        './src/themes/corejs/font-awesome',
        './src/themes/corejs/images',
        './src/themes/corejs/shell',
        './src/themes/corejs/thirdparty',
        './src/themes/corejs/app.dark.less',
        './src/themes/corejs/app.less',
        './src/themes/corejs/common.less',
        './src/themes/corejs/*.css'
    ]);
});


// copy files from the module CoreJS to the src/themes folder
// this is necessary to compile de less with the product variables
gulp.task('copy:styles_corejs', ['clean:styles_corejs'], () => {

    return gulp.src('./node_modules/@primavera/corejs/styles/**/*', { base: './node_modules/@primavera/corejs/styles' })
        .pipe(chmod(666))
        .pipe(gulp.dest('./src/themes/corejs'));
});

// compile the coreJS less
gulp.task('compile:corejs_less', ['copy:styles_corejs'], () => {

    var white = gulp.src('./src/themes/corejs/corejs.white.less')
        .pipe(less())
        .pipe(themePrefix('pri-white-theme '))
        .pipe(gulp.dest('./src/themes/corejs/'));

    var dark = gulp.src('./src/themes/corejs/corejs.dark.less')
        .pipe(less())
        .pipe(themePrefix('pri-dark-theme '))
        .pipe(gulp.dest('./src/themes/corejs/'));

    var common = gulp.src('./src/themes/corejs/corejs.common.less')
        .pipe(less())
        .pipe(gulp.dest('./src/themes/corejs/'));

    let login = gulp.src('./src/themes/corejs/corejs.login.less')
        .pipe(less())
        .pipe(gulp.dest('./src/themes/corejs/'));

    let loginDebug = gulp.src('./src/themes/corejs/corejs.login.debug.less')
        .pipe(less())
        .pipe(gulp.dest('./src/themes/corejs/'));

    return merge(white, dark, common, login, loginDebug);
});

gulp.task('default', function () {
    // place code for your default task here
});

// run before the build
gulp.task('prebuild', ['tinymceThemeHack', 'compile:corejs_less']);
gulp.task('prebuild', ['tinymceThemeHackLowerCase', 'compile:corejs_less']);

// run after the build
gulp.task('postbuild', ['copy:assets', 'copy:assets_to_login']);

// run before the debug
//gulp.task('predebug', ['compile:corejs_less', 'copy:assets_to_login'] , function(){
gulp.task('predebug', ['copy:styles_corejs', 'compile:corejs_less'], function () {
    let projAssetsFolder = path.join(srcFolder, 'assets');

    let primaveraModulesPath = `${nodeModulesFolder}/@primavera`;
    let dirs = fs.readdirSync(primaveraModulesPath);
    let dirAssetsPath = [];

    for (let index in dirs) {
        let moduleFolder = dirs[index];
        let assetsPath = `${nodeModulesFolder}/@primavera/${moduleFolder}/assets/i18n/**/*.lang.json`;
        let assetsPathDebugOnly = `${nodeModulesFolder}/@primavera/${moduleFolder}/i18n/**/*.lang.json`;

        dirAssetsPath.push(assetsPath);
        dirAssetsPath.push(assetsPathDebugOnly);
    }

    return gulp.src(dirAssetsPath)
        .pipe(chmod(666))
        .pipe(gulp.dest(`${projAssetsFolder}/i18n`));
});

/**
 * Deletes the specified folder
 */
function deleteFolders(folders) {
    return del(folders);
}

gulp.task('tinymceThemeHack', () => {

    replaceInFiles(replaceInFilesOptions)
        .then(({ changedFiles, countOfMatchesByPaths }) => {
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });


});

gulp.task('tinymceThemeHackLowerCase', () => {


    replaceInFiles(toLowerInFilesOptions)
        .then(({ changedFiles, countOfMatchesByPaths }) => {
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
});

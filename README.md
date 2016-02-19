# Shuaibird's Frontend Workflow
##Main Feautures
- type `gulp` to use the watch powerful feature and launch live-reloading local sever, once set up, everythings flows beautifully
- type `gulf minify` to compress all the files (html, css, js & json) and save it into the production directory without any manual modification
- type `gulf imgMinify` to compress the images (the origin ones inside the development dir won't be modified just for convenience)

##More Details
1. `gulp default` includes:
  - `gulp coffee` loads [gulp-coffee]() to process the .coffee into vanilla .js (inside the  sub-dir scripts of the components
  - `gulp concat` loads [gulp-concat]() to concat all of the components scripts into one script inside the `./builds/development` dir, keep in mind this task also includes the [gulp-browserify]() to auto load common libraries and frameworks (feel free to delete this feature as long as it's not necessary)
  - `gulp compass` loads [gulp-compass]() to process all the .scss  and concat them together into one vanilla .css inside the `./builds/development/css` dir
  - `gulp server`, `gulp liveReload` and `gulp watch`
<hr>
2. `gulp minify` includes: 
  - `gulp htmlMinify` loads [gulp-htmlmin]()
  - `gulp cssMinify` loads [gulp-cssnano]()
  - `gulp jsMinify` loads [gulp-uglify]()
  - `gulp jsonMinify` loads [gulp-jsonminify]()
<hr>
3. `gulp imgMinify` 
  - `gulp lmgMinify` loads [gulp-htmlmin]() and [imagemin-pngcrush]() to compress images
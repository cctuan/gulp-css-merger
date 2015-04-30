# gulp-css-merger

[gulp](http://gulpjs.com/) plugin to concat all css from html form into one and append it back

## Installation

## API

## Usage

template.html
```
<html>
<head>
  <link rel="stylesheet" href="a.css">
  <link rel="stylesheet" href="b.css">
</head>
</html>
```

gulpfile.js
```
var gulp   = require('gulp');
var cssMerger = require('gulp-css-merger');

gulp.task('concat-css-from-html', function() {
  return gulp.src('src/*.html')
    .pipe(cssMerger())
    .pipe(gulp.dest('dist/'));
    // Generate concated css file to dist
});
```
After running ``` gulp concat-css-from-html ``` , it will generate below files.

dist/template.html
```
<html>
<head>
  <link rel="stylesheet" href="template_bundle.css">
</head>
</html>
```
dist/template_bundle.css is the concatd and uglified css files from a.css and b.css.

###cssMerger([*options*])

*options*: `Object`
- `name`: The prefix of concated file name. default to 'bundle';
- `destination`: The folder path relate to the html's location;

## LICENSE

(MIT License)

Copyright (c) 2015 George Tuan (<georgeiscoming@gmail.com>)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[clean-css]: https://github.com/cctuan/gulp-css-merger
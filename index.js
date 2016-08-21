/* jshint node: true, strict: true */
'use strict';
var testPull; 
var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom');
var utils = require('gulp-util');
var PluginError = utils.PluginError;
var through2 = require('through2');
var sqwish = require('sqwish');
var pluginName = 'gulp-css-merger';

function extractStyle(mutator, htmlPath, outputRefDirPath, outputPrefixName,
                      file, pool) {
  var styles = mutator.querySelectorAll('link[rel="stylesheet"]');
  var result = '';
  var htmlName = path.basename(htmlPath, path.extname(htmlPath));
  var basePath = path.dirname(htmlPath);
  var refFilePath = path.join(outputRefDirPath,
    htmlName + '_' + outputPrefixName + '.css');
  var targetFilePath = path.join(basePath, refFilePath);

  for (var i = 0; i < styles.length; i++) {
    var stylePath = path.join(basePath, styles[i].href);
    if (!fs.existsSync(stylePath)) {
      continue;
    }
    var styleContent = fs.readFileSync(stylePath, { encoding: 'utf8' });
    result += styleContent;
    styles[i].parentElement.removeChild(styles[i]);
  }

  //fs.writeFileSync(targetFilePath, sqwish.minify(result));
  var newLink = mutator.createElement('link');
  newLink.href = refFilePath;
  newLink.ref = 'stylesheet';
  mutator.querySelector('head').appendChild(newLink);
  file.contents = new Buffer(jsdom.serializeDocument(mutator));
  pool.push(file);
  pool.push(new utils.File({
    cwd: "",
    base: "",
    path: refFilePath,
    contents: new Buffer(sqwish.minify(result))
  }));
  //return file;
}


/**
 * @param {Object} options - destination or default to style/bundle.css
 *                           new prefix name or default A(html)_bundle.css
 */
module.exports = function gulpMinifyCSS(options) {
  options = options || {};
  var destName = options.name || 'bundle';
  var destination = options.destination || 'style';
  var stream = through2.obj(function modifyContents(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return stream.emit("error", new PluginError(pluginName,
        "Streaming not supported"));
    }
    var self = this;
    if (file.isBuffer()) {
      var htmlPath = file.path;
      jsdom.env({
        html: file.contents.toString("utf8"),
        done: function (errors, window) {
          if (errors) {
            return stream.emit("error", new PluginError(pluginName,
              "Error parsing document: " + file.path));
          }
          var outputFile = extractStyle(window.document, htmlPath, destination,
            destName, file, self);
          cb();
        }
      });
    }
  });
  return stream;
};

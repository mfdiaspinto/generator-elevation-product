var through = require('through2'),
  rework = require('rework'),
  isPresent = require('is-present'),
  hasClassSelector = require('has-class-selector'),
  classPrefix = function (prefix, options) {
    options = options || {};
    var ignored = options.ignored;

    return function prefixRules(styling) {
      styling.rules.forEach(function (rule) {

        if (rule.rules) {
          return prefixRules(rule);
        }

        if (!rule.selectors) return rule;

        rule.selectors = rule.selectors.map(function (selector) {
          var shouldIgnore = false;

          var r = shouldIgnore ? selector : ".".concat(prefix, selector);

          return r;

        });
      });
    };
  };

module.exports = function (prefix, options) {
  options = options || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (!file.isBuffer()) {
      cb();
    }

    var src = file.contents.toString();
    var css = rework(src, { source: file.path })
      .use(classPrefix(prefix, options)).toString({ sourcemap: true });

    file.contents = new Buffer(css);
    cb(null, file);
  });
};

/*
 * This is a plugin designed for injecting variables to HTML templates via HtmlWebpackPlugin.
 * To use this plugin, add this to your webpack right after the HtmlWebpackPlugin.
 * This plugin accepts an object as parameter, which contains key value pairs of the variables to be injected.
 *
 * The following example declars a variable named 'foo', which it's value is 'bar'.
 * `new HtmlVariablesPlugin({ foo: 'bar' })`.
 * Then in your HTML, use this syntax to include the variables: `%foo%`,
 * and it will be automatically replaced to 'bar'.
 *
 * To create plugin for HtmlWebpackPlugin:
 * https://github.com/jantimon/html-webpack-plugin#beforeemit-hook
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const escapeString = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

class HtmlVariablesPlugin {
  constructor(replacements) {
    this.replacements = replacements;
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('HtmlVariablesPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'HtmlVariablesPlugin', (data, cb) => {
          Object.keys(this.replacements).forEach(key => {
            const matchStr = '%' + escapeString(key) + '%';
            const value = this.replacements[key];

            data.html = data.html.replace(new RegExp(matchStr, 'g'), value);
          });

          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlVariablesPlugin;

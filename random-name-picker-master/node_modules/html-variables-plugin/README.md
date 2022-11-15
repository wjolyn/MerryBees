# HTML Variables Plugin #

This is a plugin designed for injecting variables to HTML templates via HtmlWebpackPlugin. To use this plugin, add this to your webpack right after the HtmlWebpackPlugin. This plugin accepts an object as parameter, which contains key value pairs of the variables to be injected.

## Usage ##
The following example declars a variable named 'foo', which it's value is 'bar'.

#### In your Webpack config: ####
```
const HtmlVariablesPlugin = require('html-variables-plugin');

module.exports = {
  // ... Other settings
  plugins: [
    // ... HtmlWebpackPlugin and Other plugins
    new HtmlVariablesPlugin({ foo: 'bar' })
  ]
}
```

#### In your HTML: ####
```
<h1>%foo%</h1>
```

---

## Reference ##
* [How to create plugin for HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#beforeemit-hook)

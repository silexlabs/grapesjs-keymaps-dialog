# GrapesJS Keymap Dialog

This GrapesJS plugin implements a floating UI showing the available keymaps for the editor.

> This code is part of a bigger project. Check out [Silex v3](https://github.com/silexlabs/Silex).

### Features

- 🎨 Customizable CSS
- ✨ Modern UI
- 📦 No configuration needed (uses the GrapesJS Keymap API)
- 🌿 Lightweight plugin (~ 15 KB)

### Demonstration

You can check a demonstration of this plugin [here](##).
> **Provide a live demo of your plugin**
For a better user engagement create a simple live demo by using services like [JSFiddle](https://jsfiddle.net) [CodeSandbox](https://codesandbox.io) [CodePen](https://codepen.io) and link it here in your README (attaching a screenshot/gif will also be a plus).
To help you in this process here below you will find the necessary HTML/CSS/JS, so it just a matter of copy-pasting on some of those services. After that delete this part and update the link above

![demo](https://github.com/SuperDelphi/grapesjs-keymaps-dialog/assets/44942598/9b5b6d75-9557-4470-885a-fb4bc4858c12)

### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://unpkg.com/grapesjs-keymaps-dialog"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  plugins: ['grapesjs-keymaps-dialog'],
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```



## Options

| Option | Description | Default |
|-|-|-
| `option1` | Description option | `default value` |



## Download

* CDN
  * `https://unpkg.com/grapesjs-keymaps-dialog`
* NPM
  * `npm i grapesjs-keymaps-dialog`
* GIT
  * `git clone https://github.com/SuperDelphi/grapesjs-keymaps-dialog.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-keymaps-dialog.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      plugins: ['grapesjs-keymaps-dialog'],
      pluginsOpts: {
        'grapesjs-keymaps-dialog': { /* options */ }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-keymaps-dialog';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  }
  // or
  plugins: [
    editor => plugin(editor, { /* options */ }),
  ],
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/SuperDelphi/grapesjs-keymaps-dialog.git
$ cd grapesjs-keymaps-dialog
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT

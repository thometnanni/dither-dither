# dither-dither

[demo](https://thometnanni.github.io/dither-dither/)

`npm i @krisenstab/dither-dither`

`import '@krisenstab/dither-dither'`

`<dither-dither src="…"></dither-dither>`

## What?

This is a web component for monochrome dithering. It works on images and videos. It's based on shaders and should be quite fast. It uses a blue noise threshold map. But you can also specify a custom threshold map.

## Why?

- looks nice
- small media files – in most cases you'll get away with using [images](https://github.com/thometnanni/dither-dither/blob/main/public/hermannstrasse.jpg) and [videos](https://github.com/thometnanni/dither-dither/blob/main/public/hermannstrasse.mp4) of atrocious quality

## How?

install the package through npm

```sh
npm i @krisenstab/dither-dither
```

import in javascript…

```js
import "@krisenstab/dither-dither";
```

…or directly in your html file

```html
<script type="module">
import "@krisenstab/dither-dither";
</script>
```

use

```html
<!-- images -->
<dither-dither src="./hermannstrasse.jpg"></dither-dither>

<!-- videos (`type="video"` can be omitted for filenames ending in .mp4, .webm, .ogg) -->
<dither-dither src="./hermannstrasse.mp4" type="video"></dither-dither>

<!-- custom threshold map -->
<dither-dither src="./hermannstrasse.jpg" threshold-map="./bayer8x8.png"></dither-dither>

<!-- cross origin, sets cross origin mode to `anonymous` see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/crossOrigin -->
<dither-dither cross-origin src="https://…"></dither-dither>

<!-- by default a webgl context is only created once the element is in the viewport. to disable that behaviour set the `immediate` attribute -->
<dither-dither src="./hermannstrasse.jpg" immediate></dither-dither>
```

## Attributes

The element is configured entirely through HTML attributes. It has no settable JavaScript properties.

| Attribute | Default | Description |
| --- | --- | --- |
| `src` | – | URL of the image or video to dither. Required. |
| `type` | auto | `"video"` to force video handling. If omitted, the media is treated as a video when the `src` file extension is `mp4`, `webm` or `ogg`, and as an image otherwise. |
| `threshold-map` | blue noise | URL of the image used as the threshold map. |
| `dark` | `#000` | Color used for pixels below the threshold. Accepts any CSS color value (e.g. `"navy"`, `"transparent"`, `"#1a1a1a"`, `"rgb(20,20,20)", `"rgba(20,20,20,0.5)"`). |
| `light` | `#fff` | Color used for pixels above the threshold. Accepts any CSS color value. |
| `width` | media width | Width of the output in CSS pixels. If only `width` is set, the height follows the media aspect ratio. |
| `height` | media height | Height of the output in CSS pixels. If only `height` is set, the width follows the media aspect ratio. |
| `object-fit` | stretch | How the media is drawn inside the output box: `contain` (letterboxed, keeps aspect ratio) or `cover` (cropped to fill, keeps aspect ratio). Omitting it, stretches the media to the box. Only has a visible effect when both `width` and `height` are set. |
| `cross-origin` | – | Sets the `crossorigin` mode used when loading the media from another origin. An empty value (`cross-origin` with no value) means `anonymous`; other values such as `use-credentials` are passed through as-is. |
| `immediate` | – | Presence of the attribute enables rendering right away, instead of waiting for the element to enter the viewport. |
| `alt` | `""` | Accessible label for the rendered canvas (`role="img"`). |

## Development

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify Library

```sh
npm run build
```

### Compile and Minify static Page

```sh
npm run build:site
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

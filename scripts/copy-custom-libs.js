// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
// Added font-awesome as custom script

// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
const existingConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');
module.exports = Object.assign(existingConfig, {
    copyFontawesomeFonts: {
      src: ['{{ROOT}}/node_modules/keyrune/fonts/**/*'],
      dest: '{{WWW}}/assets/fonts'
    },
    copyFontawesomeCss: {
      src: ['{{ROOT}}/node_modules/keyrune/css/keyrune.min.css'],
      dest: '{{WWW}}/assets/css'
    },
    copyFlagIconCss: {
      src: ['{{ROOT}}/node_modules/flag-icon-css/css/flag-icon.min.css'],
      dest: '{{BUILD}}'
    },
    copyFlagIconFlagsCss: {
      src: ['{{ROOT}}/node_modules/flag-icon-css/flags/**/*'],
      dest: '{{WWW}}/flags'
    }
  }
);
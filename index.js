const postcss = require('postcss');
const { pluginOptions } = require('./lib/plugin-options');
const { runSpritesmith } = require('./lib/run-spritesmith');
const { updateReferences } = require('./lib/update-references');
const { addSpriteGroups } = require('./lib/sprite-groups');
const { collectImages } = require('./lib/collect-images');
const { setTokens } = require('./lib/tokens');
const { mapSpritesProperties, saveSprites } = require('./lib/sprites');

/**
 * postcss-easysprites module.
 * @module postcss-easysprites
 * @param {processOptions} [options] Options passed to the plugin.
 */
module.exports = postcss.plugin('postcss-easysprites', (options) => {
  return async (css) => {
    // Setup options.
    pluginOptions.init(options, css.source.input.file);

    try {
      const images = await collectImages(css);
      await addSpriteGroups(images);
      await setTokens(images, css);
      const sprites = await runSpritesmith(images);
      await saveSprites(images, sprites);
      await mapSpritesProperties(images, sprites);
      await updateReferences(images, sprites, css);
    } catch (error) {
      throw new Error(error);
    }
  };
});

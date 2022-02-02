const withPlugins = require("next-compose-plugins");
const nextImages = require("next-images");
const nextTranslate = require("next-translate");

module.exports = withPlugins([nextTranslate({}), nextImages], {
  images: {
    disableStaticImages: true,
  },
});

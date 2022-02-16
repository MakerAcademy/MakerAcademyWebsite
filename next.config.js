const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const nextTranslate = require("next-translate");

module.exports = withPlugins([withImages, nextTranslate], {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
});

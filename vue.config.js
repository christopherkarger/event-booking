const manifestJSON = require("./public/manifest.json");

module.exports = {
  pwa: {
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color
  }
}
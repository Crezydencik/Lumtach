const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "lv", "ru"],
  },
  localePath: path.resolve("./src/locales"),
};

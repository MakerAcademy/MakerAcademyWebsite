const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var fs = require("fs");

const URL =
  "https://us-central1-maker-localizations.cloudfunctions.net/firestoreLocalesOnRequest";

const languages = ["en", "fr", "es", "ru", "ar", "zh", "hi", "sw"];

const getLocales = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const generateJsons = (data) => {
  data.map((item, i) => {
    const fileName = item._filename;

    languages.map((lang) => {
      const locales = item[lang];

      if (lang && fileName && locales) {
        if (!fs.existsSync(lang)) {
          fs.mkdirSync(lang);
        }

        fs.writeFile(
          `${lang}/${fileName}.json`,
          JSON.stringify(locales),
          (err) => {
            if (err) throw err;
            console.log("complete");
          }
        );
      }
    });
  });
};

const main = async () => {
  const data = await getLocales();
  if (data && data.length) {
    generateJsons(data);
  }
};

main();

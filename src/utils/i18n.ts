import i18n from "i18next";
import ICU from "i18next-icu";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { GLOBAL_ENV } from "@/constants/index";

i18n
  .use(ICU)
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    backend: {
      loadPath: GLOBAL_ENV.DEV
        ? "public/locales/{{lng}}/{{ns}}.json"
        : "locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      "ru",
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    watchIgnoreFiles: ["**/config/sync/**"],
    translations: {
      ru: {
        // Общие элементы интерфейса
        "Auth.form.email.label": "Электронная почта",
        "Auth.form.password.label": "Пароль",
        "Auth.form.button.login": "Войти",
        "Auth.form.button.forgot-password": "Забыли пароль?",

        // Навигация / меню
        "content-manager.listView.header.title": "Записи",
        "content-manager.createView.header.title": "Создать запись",
        "content-manager.editView.header.title": "Редактировать запись",
        "Settings.profile.form.section.experience.interfaceLanguage":
          "Язык интерфейса",

        "product.product/create": "Создать новый товар",
      },
    },
  },

  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};

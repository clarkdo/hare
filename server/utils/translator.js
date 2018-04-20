/**
 * Translator service.
 *
 * Use this to translate responses Koa would send.
 *
 * We do not need all translations from client,
 * keep things tidy here for what we really need.
 *
 * This is a starting point, maybe it should be implemented
 * differently but is better than locking in raw source
 * messages in only one locale.
 */
class Translator {
  constructor (translated) {
    this.translated = translated
  }
  translate (key) {
    const hasTranslation = this.translated.hasOwnProperty(key)
    const pick = hasTranslation ? this.translated[key] : `${key}**`
    return pick
  }
}

export default (locale) => {
  let fallbackLocale = 'en'
  let messages = {}
  try {
    // This might be reworked differently. WebPack.
    const attempt = require(`../locales/${locale}.json`)
    messages = Object.assign({}, attempt)
  } catch (e) {
    const attempt = require(`../locales/${fallbackLocale}.json`)
    messages = Object.assign({}, attempt)
  }

  return new Translator(messages)
}

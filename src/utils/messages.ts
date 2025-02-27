

import enGb from '../translations/en-GB.json'

import { toCamelCase } from './string'

export const defaultLocale = process.env.REACT_APP_DEFAULT_LOCALE ?? 'en-GB'


const isDevEnvironment = process.env.NODE_ENV === 'development'

const i18n: { [key: string]: { [key: string]: string } } = {
  en: enGb, 
}


export const getLocaleOrFallback = (userLocale?: string): string => {
  const allowedLocaleFormat = /^[a-z]{2}[_|-][A-Z]{2}$|^[a-z]{2}$/

  if (!userLocale || !allowedLocaleFormat.test(userLocale)) {
    const errorMsg = !userLocale ? 'No user locale provided' : `User locale (${userLocale}) invalid`
    isDevEnvironment && console.warn(`${errorMsg}! Loaded default locale: ${defaultLocale}`)

    return defaultLocale
  }

  const language = getLanguagePartOfLocale(userLocale)

  if (!Object.keys(i18n).includes(toCamelCase(userLocale)) && Object.keys(i18n).includes(language)) {
    isDevEnvironment &&
      console.warn(
        `Translations for user locale (${userLocale}) not available! Loaded local language fallback: ${language}`,
      )

    return language
  }

  if (!Object.keys(i18n).includes(toCamelCase(userLocale)) && !Object.keys(i18n).includes(language)) {
    isDevEnvironment &&
      console.warn(
        `Translations for user locale (${userLocale}) and local language fallback (${language}) not available! Loaded default locale: ${defaultLocale}`,
      )

    return defaultLocale
  }

  userLocale = userLocale.includes('_') ? userLocale.replace('_', '-') : userLocale

  isDevEnvironment && console.log(`Loaded user locale: ${userLocale}`)

  return userLocale
}

export const getMessages = (
  locale: string,
  checkForFallback?: boolean,
): { [key: string]: string } => {
  if (checkForFallback) locale = getLocaleOrFallback(locale)

  let language
  const localeIcuOrJavaFormat = /^[a-z]{2}[_|-][A-Z]{2}$/
  if (localeIcuOrJavaFormat.test(locale)) {
    language = getLanguagePartOfLocale(locale)
  }

  return {
    ...(defaultLocale !== locale && getMessagesForLocale(defaultLocale)),
    ...(language && getMessagesForLocale(language)),
    ...getMessagesForLocale(locale),
  }
}

const getLanguagePartOfLocale = (locale: string) => {
  if (locale.includes('_')) locale = locale.replace('_', '-')
  const [language] = locale.split(new RegExp('[_|-]', 'g'))

  return language
}

const getMessagesForLocale = (locale: string): { [key: string]: string } => i18n[toCamelCase(locale)]

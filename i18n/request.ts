import {getRequestConfig} from 'next-intl/server';
import {routing, type AppLocale} from './routing';

export default getRequestConfig(async ({locale}) => {
  const requestedLocale = await locale;
  const validLocale = routing.locales.includes(requestedLocale as AppLocale)
    ? (requestedLocale as AppLocale)
    : routing.defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});

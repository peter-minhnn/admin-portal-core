import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

const siteName = 'Lang Gao Portal';

export const siteConfig = {
  title: siteName,
  description: siteName,
  // logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: 'DEFAULT',
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - ${siteName}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - ${siteName}` : title,
      description,
      url: 'https://langgao.net',
      siteName: 'langgao', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: '',
        width: 1200,
        height: 630,
      },
      locale: 'vi_VN',
      type: 'website',
    },
  };
};

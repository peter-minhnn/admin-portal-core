import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: `freshphởbún - Trang Quản Lý`,
  description: "freshphởbún",
  // logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: "DEFAULT",
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description,
): Metadata => {
  return {
    title: title ? `${title} - freshphởbún` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - freshphởbún` : title,
      description,
      url: "https://freshphobun.com",
      siteName: "freshphởbún", // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "",
        width: 1200,
        height: 630,
      },
      locale: "vi_VN",
      type: "website",
    },
  };
};

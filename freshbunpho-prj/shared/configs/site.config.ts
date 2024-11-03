import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { loginMessages } from "@/shared/messages";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: `${loginMessages.webName} - Trang Quản Lý`,
  description: loginMessages.webName,
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
    title: title ? `${title} - ${loginMessages.webName}` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - ${loginMessages.webName}` : title,
      description,
      url: "https://betiadmin.com",
      siteName: loginMessages.webName, // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "",
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  };
};

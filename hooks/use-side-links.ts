import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/states/common.state';
import { SideLink, sideLinks, sideLinksAuth } from '@/shared/data/side-links';

export default function useSideLinks(): SideLink[] {
  const { userInfo } = useUserStore();
  const t = useTranslations('MenuMessages');
  const locale = useLocale();

  if (
    userInfo?.userName === process.env.NEXT_PUBLIC_AUTH_ID &&
    userInfo?.pwd === process.env.NEXT_PUBLIC_AUTH_PWD
  ) {
    return [...sideLinks(t, locale), ...sideLinksAuth(t, locale)];
  }
  return [...sideLinks(t, locale)];
}

// export default function useSideLinks(): SideLink[] {
//   const { userInfo } = useUserStore();
//   const t = useTranslations('MenuMessages');
//   const locale = useLocale();
//
//   const menus: SideLink[] = [];
//   const pages = get(userInfo, 'role.pages', []);
//   if (pages.length) {
//     pages.forEach((rolePage) => {
//       const sideLink = sideLinks(t, locale).find(
//         (sideLink) => sideLink.href === rolePage.pageUrl
//       );
//       if (sideLink) {
//         menus.push(sideLink);
//       }
//     });
//   }
//
//   return menus;
// }

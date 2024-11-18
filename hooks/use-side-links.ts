import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/states/common.state';
import { SideLink, sideLinks } from '@/shared/data/side-links';

export default function useSideLinks(): SideLink[] {
  const { userInfo } = useUserStore();
  const t = useTranslations('MenuMessages');
  const locale = useLocale();

  const menus: SideLink[] = [];
  if (userInfo?.rolePages) {
    userInfo.rolePages.forEach((rolePage) => {
      const sideLink = sideLinks(t, locale).find(
        (sideLink) => sideLink.href === rolePage.pageUrl
      );
      if (sideLink) {
        menus.push(sideLink);
      }
    });
  }

  return menus;
}

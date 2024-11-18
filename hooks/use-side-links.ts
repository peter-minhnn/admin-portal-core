import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/states/common.state';
import { SideLink, sideLinks } from '@/shared/data/side-links';
import get from 'lodash/get';

export default function useSideLinks(): SideLink[] {
  const { userInfo } = useUserStore();
  const t = useTranslations('MenuMessages');
  const locale = useLocale();

  const menus: SideLink[] = [];
  const pages = get(userInfo, 'role.pages', []);
  if (pages.length) {
    pages.forEach((rolePage) => {
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

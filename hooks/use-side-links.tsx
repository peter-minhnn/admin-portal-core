import { useTranslations } from "next-intl";
import { useUserStore } from "@/states/common.state";
import { SideLink, sideLinks } from "@/shared/data/side-links";

export default function useSideLinks(): SideLink[] {
  const { userInfo } = useUserStore();
  console.log(userInfo);
  const t = useTranslations("MenuMessages");

  const menus: SideLink[] = [];
  if (userInfo?.rolePages) {
    userInfo.rolePages.forEach((rolePage) => {
      const sideLink = sideLinks(t).find(
        (sideLink) => sideLink.href === rolePage.pageUrl,
      );
      if (sideLink) {
        menus.push(sideLink);
      }
    });
  }

  return menus;
}

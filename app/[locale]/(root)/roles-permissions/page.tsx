import LayoutContentSection from "@/components/layouts/layout-section";
import { getTranslations } from "next-intl/server";
import { metaObject } from "@/shared/configs";
import { useTranslations } from "next-intl";
import RoleGrid from "./_components/role-grid";

export async function generateMetadata() {
  "use server";
  const t = await getTranslations("MetaDataMessages");
  return {
    ...metaObject(t("rolePermissionTitle")),
  };
}

const RolePage = () => {
  const t = useTranslations("MetaDataMessages");
  return (
    <LayoutContentSection title={t("rolePermissionTitle")} desc={""}>
      <RoleGrid />
    </LayoutContentSection>
  );
};

export default RolePage;

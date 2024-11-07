import ProfileForm from "./_components/profile-form";
import ContentSection from "./_components/content-section";
import { useTranslations } from "next-intl";

export default function SettingsProfile() {
  const t = useTranslations("SettingsMessages");

  return (
    <ContentSection title={t("profile")} desc={t("profileDes")}>
      <ProfileForm />
    </ContentSection>
  );
}

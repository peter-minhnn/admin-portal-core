import ProductListPage from "./_components/product-list";
import {getTranslations} from "next-intl/server";
import {metaObject} from "@/shared/configs";

export async function generateMetadata() {
    "use server";
    const t = await getTranslations("MetaDataMessages");
    return {
        ...metaObject(t("productsTitle")),
    };
}

export default function ProductPage() {
    return (
        <ProductListPage/>
    );
}

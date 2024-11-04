import {pageRoutes} from "@/shared/routes/pages.route";
import {revalidatePath} from "next/cache";

export const updateMultipleSelectorAction = async (prevState: unknown, formData: FormData) => {
    revalidatePath(pageRoutes.sample.multipleSelector);
    return formData;
};
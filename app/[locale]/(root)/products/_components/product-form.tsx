"use client";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {AutosizeTextarea} from "@/components/ui/textarea";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {ProductFormSchema} from "@/app/[locale]/(root)/products/schema";
import {UnitType} from "@/types/product.type";
import {useModal} from "@/hooks/use-modal";
import {IconDeviceFloppy, IconX} from "@tabler/icons-react";
import FileUpload from "@/components/upload";
import {CommonCodeType} from "@/types/common.type";
import {useMutation} from "@tanstack/react-query";
import {addProduct} from "@/services/product.service";
import toast from "react-hot-toast";
import {generateUniqueId} from "@/shared/lib";
import {useEffect} from "react";
import {Icons} from "@/components/ui/icons";

type ProductFormProps = {
    units: UnitType[];
    productTypes: CommonCodeType[];
}

type ProductFormData = z.infer<typeof ProductFormSchema>;

export default function ProductForm({units = [], productTypes = []}: ProductFormProps) {
    const t = useTranslations("ProductMessages");
    const {closeModal} = useModal();

    const form = useForm<ProductFormData>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            productCode: "",
            productName: "",
            productPrice: 0,
            productType: "",
            unitCode: "",
            productMinQty: 0,
            productMaxQty: 0,
            productDesc: "",
            productImage: "",
            companyId: 1
        }
    });

    const addPostMutation = useMutation({
        mutationFn: async (data: ProductFormData) => await addProduct({
            ...data,
            productCode: generateUniqueId(data.productType)
        }),
        onSuccess: (response) => {
            console.log(response);
            toast.success(t("notifications.addProductSuccess"));
            closeModal();
        },
        onError: (error) => {
            console.error(error);
            toast.error(t("notifications.addProductError"));
        },
    })

    const onSubmit = async (data: ProductFormData) => {
        console.log(data)
        await addPostMutation.mutateAsync(data);
    };

    console.log(form.watch())

    useEffect(() => {
    }, [addPostMutation]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="productCode"
                        render={({field}) => (
                            <FormItem className="hidden">
                                <FormLabel>Product Code</FormLabel>
                                <Input type="text" value={field.value ?? ""} onChange={field.onChange} disabled/>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-between w-full gap-2">
                        <FormField
                            name="productType"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel required>{t("productType")}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t("selectProductTypeCode")}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {productTypes.map((product) => (
                                                <SelectItem key={product.code} value={product.code}>
                                                    {product.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="productName"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel required>{t("productName")}</FormLabel>
                                    <Input type="text" value={field.value ?? ""} onChange={field.onChange}
                                           placeholder={t("productName")}/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <FormField
                            name="productPrice"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel required>{t("productPrice")}</FormLabel>
                                    <Input
                                        type="number" value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value ?? 0))}
                                        placeholder={t("productPrice")}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="unitCode"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel required>{t("unitCode")}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t("selectUnitCode")}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {units.map((unit) => (
                                                <SelectItem key={unit.unitCode} value={unit.unitCode}>
                                                    {unit.unitName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <FormField
                            name="productMinQty"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel required>{t("productMinQty")}</FormLabel>
                                    <Input
                                        type="number"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value ?? 0))}
                                        placeholder={t("productMinQty")}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="productMaxQty"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel required>{t("productMaxQty")}</FormLabel>
                                    <Input
                                        type="number"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(Number(e.target.value ?? 0))}
                                        placeholder={t("productMaxQty")}
                                    />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    name="productDesc"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t("productDesc")}</FormLabel>
                            <AutosizeTextarea value={field.value ?? ""} onChange={field.onChange}
                                              placeholder={t("productDesc")} autoSize/>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="productImage"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t("productDesc")}</FormLabel>
                            <FileUpload files={field.value} onValueChange={field.onChange}/>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-end gap-2">
                    <Button
                        type="button"
                        title={t("modalCancelBtn")}
                        variant="outline"
                        onClick={closeModal}
                        disabled={addPostMutation.status === "pending"}
                    >
                        <IconX size={16}/>
                        {t("modalCancelBtn")}
                    </Button>
                    <Button
                        type="submit"
                        title={t("modalSaveBtn")}
                        variant="secondary"
                        disabled={addPostMutation.status === "pending"}
                    >
                        {addPostMutation.status === "pending" ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )
                            : <IconDeviceFloppy size={16}/>
                        }
                        {t("modalSaveBtn")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
export type ProductType = {
    productCode: string;
    productName: string;
    productDesc: number;
    productImage: string;
    productType: string;
    unitCode: string;
    productPrice: number;
    productMinQty: number;
    productMaxQty: number;
    companyId: number;
};

export type UnitType = {
    unitCode: string;
    unitName: string;
    isActive: boolean;
    isDeleted: boolean;
    companyId: number;
}
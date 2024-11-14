import {ProductFormData} from "@/types/product.type";
import {
    MRT_Row as RowCell,
} from "material-react-table";

type ProductPriceProps = {
    row: RowCell<ProductFormData>;
};

export default function ProductPrice({ row }: ProductPriceProps) {
  return (
    <div>
      <h1>ProductPricePage</h1>
    </div>
  );
}
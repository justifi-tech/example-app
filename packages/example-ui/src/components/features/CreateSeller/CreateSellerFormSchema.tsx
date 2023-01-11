import { string, object } from "yup";

const SellerFormSchema = object({
  name: string().required("Seller name is required"),
});

export default SellerFormSchema;

import { string, object } from "yup";

const SellerFormSchema = object({
  name: string().required("Sub Account name is required"),
});

export default SellerFormSchema;

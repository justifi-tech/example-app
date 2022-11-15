import * as yup from "yup";

const getCreateSellerFormSchema = () => {
  return yup.object({
    name: yup.string().required("Seller name is required"),
  });
};

export default getCreateSellerFormSchema;

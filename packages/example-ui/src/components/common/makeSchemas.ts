import { object, string, number } from "yup";

const paymentFormSchema = () => {
  return object({
    sellerAccountId: string().required("Please, select a seller"),
    amount: number()
      .required("Please, provide an amount")
      .typeError("Please, provide an amount")
      .min(1, "Amount must be greater than 0"),
    description: string().required("Please, provide a description"),
    reason: string(),
    applicationFeeAmount: number().nullable().optional(),
    metadata: string().optional(),
  });
};

const checkoutFormSchema = () => {
  return object({
    name: string()
      .required('Please, provide the name as written in your card')
      .typeError('Only alphabetic values allowed'),
    streetAddress: string().optional(),
    apartment: string().optional(),
    address_postal_code: number().required('Please, provide a valid ZIP code').typeError('Please, provide a valid ZIP code')
  });
};

const bankCheckoutFormSchema = () => {
  return object({
    streetAddress: string().optional(),
    apartment: string().optional(),
    address_postal_code: number().required('Please, provide a valid ZIP code').typeError('Please, provide a valid ZIP code')
  });
}

export {
  paymentFormSchema,
  checkoutFormSchema,
  bankCheckoutFormSchema
};

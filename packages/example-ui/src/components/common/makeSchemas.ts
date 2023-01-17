import { object, string, number } from "yup";

const paymentFormSchema = (hasSeller: boolean) => {
  return object({
    sellerAccountId: !hasSeller ? string().required("Please, select a seller") : string(),
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
    name: string()
      .required('Please, provide the bank account owner name')
      .typeError('Only alphabetic values allowed'),
    account_owner_type: string().required('Select an account owner type'),
    account_type: string().required('Select an account type')
  });
}

export {
  paymentFormSchema,
  checkoutFormSchema,
  bankCheckoutFormSchema
};

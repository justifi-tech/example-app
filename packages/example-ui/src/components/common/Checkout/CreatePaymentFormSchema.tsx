import * as yup from "yup";

const getCreatePaymentFormSchema = () => {
  return yup.object({
    amount: yup
      .number()
      .required("Please provide an amount")
      .typeError("Please provide an amount")
      .min(1, "Amount must be greater than 0"),
    description: yup.string().required("Please provide a description"),
    reason: yup.string(),
    applicationFeeAmount: yup.number().nullable().notRequired(),
    metadata: yup.string().optional(),
  });
};

export default getCreatePaymentFormSchema;

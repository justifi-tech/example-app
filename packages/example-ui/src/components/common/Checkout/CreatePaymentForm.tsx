import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  FormHelperText
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import JustiFiPalette from "../JustiFiPallete";
import { paymentFormSchema } from "./makeSchemas";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  content: {
    height: "100%",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const SubheaderText = styled(Typography)({
  color: JustiFiPalette.grey[700],
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.5",
});

interface CreatePaymentFormProps {
  submitHandler: (data: any) => void;
}

const CreatePaymentForm = (
  props: React.PropsWithChildren<CreatePaymentFormProps>
) => {
  const { submitHandler } = props;
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentFormSchema()),
    defaultValues: {
      sellerAccountId: "",
      amount: 0.0,
      description: "",
      applicationFeeAmount: null,
      metadata: "",
    },
  });

  return (
    <Box sx={{ width: "390px" }}>
      <Card variant="outlined" className={classes.content}>
        <form aria-label="refund form" onSubmit={handleSubmit(submitHandler)}>
          <CardContent sx={{ padding: "0" }}>
            <Typography
              sx={{
                fontSize: "34px",
                color: "#004C4D",
                fontWeight: 700,
                padding: "0",
              }}
            >
              Create a Payment
            </Typography>
            <SubheaderText variant="h5">
              Configure the settings of the payment you’d like to send to the
              checkout.
            </SubheaderText>
            <Box sx={{ marginTop: "32px" }}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="seller-account-id">Seller</InputLabel>
                <Select
                  label="Seller"
                  defaultValue={""}
                  {...register("sellerAccountId")}
                  error={!!errors?.sellerAccountId}
                >
                  <MenuItem value={"acc_Yzem4ZF4mKnMO0dBObRUU"}>
                    Pleasant View Gardens
                  </MenuItem>
                </Select>
                <FormHelperText error>{errors.sellerAccountId?.message}</FormHelperText>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label="Payment amount in cents"
              variant="filled"
              margin="normal"
              {...register("amount")}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
            <TextField
              fullWidth
              label="Payment description"
              variant="filled"
              margin="normal"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              fullWidth
              label="Application fee amount (optional)"
              variant="filled"
              margin="normal"
              {...register("applicationFeeAmount")}
              helperText={
                "You can override the seller's application fee rate on a per-payment basis by setting a custom amount here"
              }
            />
            <TextField
              fullWidth
              label="Metadata (optional)"
              variant="filled"
              margin="normal"
              {...register("metadata")}
              helperText="You can send along any useful information you'd like to store alongside this payment for reference later"
            />
          </CardContent>
          <CardActions sx={{ padding: "0", marginTop: "30px" }}>
            <Button type="submit" variant="contained" fullWidth={true}>
              Create Payment
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};
export default CreatePaymentForm;

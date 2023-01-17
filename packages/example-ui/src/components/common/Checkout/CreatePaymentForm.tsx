import React, { useEffect, useState } from "react";
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
import { paymentFormSchema } from "../makeSchemas";
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
  submitHandler: (data: Object, extras?: Object) => void;
  seller?: {
    sellerID: string,
    sellerName: string
  },
  disabled?: boolean
}

const CreatePaymentForm = (
  props: React.PropsWithChildren<CreatePaymentFormProps>
) => {
  const { submitHandler, disabled = true, seller } = props;
  const classes = useStyles();
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [selectedSellerSafeName, setSelectedSellerSafeName] = useState<String>('');
  const extendedSubmitHandler = (data: Object) => {
    return submitHandler(data, {
      sellerID: seller?.sellerID,
      sellerSafeName: selectedSellerSafeName || seller?.sellerName
    });
  }

  const {
    register,
    handleSubmit,
    formState
  } = useForm({
    resolver: yupResolver(paymentFormSchema(!!seller?.sellerID)),
    defaultValues: {
      sellerAccountId: seller?.sellerID || '',
      amount: 0.0,
      description: "",
      applicationFeeAmount: null,
      metadata: "",
    },
    mode: 'onChange'
  });
  const errors = formState.errors;

  useEffect(() => {
    if (formState.isDirty && !Object.entries(errors).length) {
      setEnableSubmit(true);
    }
  }, [errors, formState])

  return (
    <Box sx={{
      width: "600px",
      opacity: disabled ? 0.5 : 1
    }}>
      <Card variant="outlined" className={classes.content}>
        <form aria-label="refund form" onSubmit={handleSubmit(extendedSubmitHandler)}>
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
            
            {!seller ? 
              <Box sx={{ marginTop: "32px" }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="seller-account-id">Seller</InputLabel>
                  <Select
                    label="Seller"
                    defaultValue={""}
                    {...register("sellerAccountId")}
                    onChange={(event, element: React.PropsWithChildren<any>) => {
                      if (element?.props) {
                        setSelectedSellerSafeName(element.props['data-safe-name']);
                      }
                    }}
                    error={!!errors?.sellerAccountId}
                  >
                    <MenuItem data-safe-name='Pleasant View Gardens' value={"acc_Yzem4ZF4mKnMO0dBObRUU"}>
                      Pleasant View Gardens
                    </MenuItem>
                    <MenuItem data-safe-name='Other Seller' value={"not_an_account_value"}>
                      Other Seller
                    </MenuItem>
                  </Select>
                  <FormHelperText error>{errors.sellerAccountId?.message}</FormHelperText>
                </FormControl>
              </Box>
            :
              null
            }

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
              type="number"
              fullWidth
              label="Application fee amount"
              variant="filled"
              margin="normal"
              defaultValue={0}
              {...register("applicationFeeAmount")}
              helperText={errors.applicationFeeAmount?.message}
              error={!!errors.applicationFeeAmount}
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
            <Button
              disabled={!enableSubmit}
              type="submit"
              variant="contained"
              fullWidth
            >
              Create Payment
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};
export default CreatePaymentForm;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  styled
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import JustiFiPalette from "../JustiFiPallete";
import { paymentFormSchema } from "../makeSchemas";
import { makeStyles } from "@mui/styles";
import SelectSeller from "../../features/SelectSeller";
import { TitleText } from "../atoms";

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
  disabled?: boolean,
  width?: string,
  title?: string
}

const CreatePaymentForm = (
  props: React.PropsWithChildren<CreatePaymentFormProps>
) => {
  const { submitHandler, disabled = true, seller, width, title } = props;
  const classes = useStyles();
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [selectedSeller, setSelectedSeller] = useState<{sellerID: string, sellerSafeName: string}>();
  const extendedSubmitHandler = (data: Object) => {
    return submitHandler(data, {
      sellerID: selectedSeller?.sellerID || seller?.sellerID,
      sellerSafeName: selectedSeller?.sellerSafeName || seller?.sellerName
    });
  }

  const {
    register,
    handleSubmit,
    formState
  } = useForm({
    resolver: yupResolver(paymentFormSchema(!!selectedSeller?.sellerID || !!seller?.sellerID)),
    defaultValues: {
      sellerAccountId: selectedSeller?.sellerID || seller?.sellerID || '',
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

  const onSellerSelected = (selectedSellerID: any, selectedSellerSafeName: any) => {
    setSelectedSeller({sellerID: selectedSellerID, sellerSafeName: selectedSellerSafeName});
  }

  return (
    <Box sx={{
      width: width || "600px",
      opacity: disabled ? 0.5 : 1
    }}>
      <Card variant="outlined" className={classes.content}>
        <form aria-label="refund form" onSubmit={handleSubmit(extendedSubmitHandler)}>
          <CardContent sx={{ padding: "0" }}>
            <TitleText>
              {title ? title :
                'Create a Payment'
              }
            </TitleText>
            <SubheaderText variant="h5">
              Configure the settings of the payment you’d like to send to the
              checkout.
            </SubheaderText>
            
            {!seller ? 
              <SelectSeller noForm submitOnChange handleSubmit={onSellerSelected} height={56}/>
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
              label="Application fee amount (optional)"
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

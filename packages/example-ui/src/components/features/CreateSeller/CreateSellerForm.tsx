import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import JustiFiPalette from "../../common/JustiFiPallete";
import { makeStyles } from "@mui/styles";
import SellerFormSchema from "./CreateSellerFormSchema";

const useStyles = makeStyles(() => ({
  content: {
    width: "100%",
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

interface CreateSellerFormProps {
  submitHandler: (data: any) => void;
}

const CreateSellerForm = (
  props: React.PropsWithChildren<CreateSellerFormProps>
) => {
  const { submitHandler } = props;
  const [sellerName, setSellerName] = React.useState<string>("");
  const [shouldValidate, setShouldValidate] = React.useState<boolean>(false);

  const sellerNameRef = React.useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(SellerFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSellerName = (event: React.ChangeEvent<any>) => {
    const sellerNameValue = event.target.value;
    setValue("name", sellerNameValue, { shouldValidate: shouldValidate });
    setSellerName(sellerNameValue);
  };

  const onSubmit = (data: any) => {
    submitHandler(data);
  };

  const onError = (errors: any) => {
    setShouldValidate(true);
    if (errors.sellerName)
      (sellerNameRef.current?.children[0] as HTMLInputElement).focus();
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '600px'
    }}>
      <Card variant="outlined" className={classes.content}>
        <form
          aria-label="refund form"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <CardContent sx={{ padding: "0" }}>
            <Typography
              sx={{
                fontSize: "34px",
                color: "#004C4D",
                fontWeight: "bold",
                padding: "0",
              }}
            >
              Create a Seller
            </Typography>
            <SubheaderText variant="h5">
              {
                "Provide the name of the seller you'd like to send to hosted onboarding."
              }
            </SubheaderText>
            <TextField
              fullWidth
              id="create-seller"
              label="Seller name"
              type="search"
              variant="filled"
              margin="normal"
              {...register("name")}
              value={sellerName}
              error={!!errors.name}
              onChange={handleSellerName}
              InputProps={{
                ref: sellerNameRef,
              }}
              helperText={errors.name?.message}
            />
          </CardContent>
          <CardActions sx={{ padding: "0", marginTop: "30px" }}>
            <Button type="submit" variant="contained" fullWidth>
              Create Seller
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};
export default CreateSellerForm;

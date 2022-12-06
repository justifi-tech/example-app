import React, { useEffect } from "react";
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
import JustiFiPalette from "../common/JustiFiPallete";
import { makeStyles } from "@mui/styles";
import { getSellers } from "../../api/Seller";

const useStyles = makeStyles(() => ({
  content: {
    height: "100%",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

// const SubheaderText = styled(Typography)({
//   color: JustiFiPalette.grey[700],
//   fontSize: "16px",
//   fontWeight: 400,
//   lineHeight: "1.5",
// });

interface SelectSellerProps {
  submitHandler: (data: any) => void;
}

const SelectSeller = (
  props: React.PropsWithChildren<SelectSellerProps>
) => {
  const { submitHandler } = props;
  const [sellers, setSellers] = React.useState<string[]>(['']);
  const classes = useStyles();

  useEffect(() => {
    const fetchSellers = async () => {
      const sellers = await getSellers();
      console.log(sellers);
    };

    fetchSellers();
  }, [])

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm({
  //   resolver: yupResolver(getCreateSellerFormSchema()),
  //   defaultValues: {
  //     name: "",
  //   },
  // });

  return (
    <Box>
      {/* <Card variant="outlined" className={classes.content}>
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
                "Provide the name of the seller you’d like to send to hosted onboarding."
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
            <Button type="submit" variant="contained" fullWidth={true}>
              Create Seller
            </Button>
          </CardActions>
        </form>
      </Card> */}
    </Box>
  );
};
export default SelectSeller;

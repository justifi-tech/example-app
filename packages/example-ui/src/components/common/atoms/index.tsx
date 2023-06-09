import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement } from "react";
import { IPayment } from "../../../api/Payment";

const TitleText = ({ children }: { children: ReactElement | string }) => <Typography
  sx={{
    fontSize: "34px",
    color: "#004C4D",
    fontWeight: "bold",
    padding: "0",
  }}
>{children}</Typography>

const SuccessPrompt = ({ children, open, close, entityLink, createdPayment }: {
  children?: ReactElement | string, open: boolean, close: () => void,
  entityLink?: string, createdPayment?: IPayment
}) => (
  <Dialog onClose={close} open={open}>
    <DialogContent>
      {children}
      {createdPayment &&
        <>
          <Box><strong>Payment ID:</strong> {createdPayment.id}</Box>
          <Box><strong>Payment Amount:</strong> {createdPayment.amount}</Box>
          <Box><strong>Payment Fee:</strong> {createdPayment.applicationFee?.amount}</Box>
          <Box><strong>Payment Account:</strong> {createdPayment.accountId}</Box>
          {entityLink &&
            <Typography variant="caption">For more details, please click the below link to see the entity in the dashboard.</Typography>
          }
        </>
      }
    </DialogContent>
    <DialogActions sx={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px'
    }}>
      {entityLink && 
        <Button variant="contained">
          <Link
            underline="none"
            color="inherit"
            target="_blank"
            rel="noopener"
            href={entityLink}
          >See this entity in the dashboard</Link>
        </Button>
      }
      <Button variant="contained" onClick={close}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

const SpinningLoader = () => (
  <Box sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 10000
  }}>
    <CircularProgress
      size={80}
      sx={{
        color: 'gray',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
        zIndex: 200
      }}
    />
  </Box>
)

export {
  TitleText,
  SuccessPrompt,
  SpinningLoader
};
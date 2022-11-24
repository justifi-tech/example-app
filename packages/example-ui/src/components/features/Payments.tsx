import React, { useEffect } from "react";
import { Grid, Typography, styled } from "@mui/material";
import AdminLayout from "../common/AdminLayout";
import { PageTable } from "../common/PageTable";
import JustiFiPalette from "../common/JustiFiPallete";
import PaginationComponent, {
  IPagination,
  Pagination,
} from "../common/PaginationComponent";
import { Payment } from "../../api/Payment";
import PaymentsTableRow from "../common/Payments/PaymentsTableRow";
import PaymentsTableHeaderRow from "../common/Payments/PaymentsTableHeaderRow";

export interface IApiResponse<T> {
  data: T;
  error?: IErrorObject | IServerError;
  page_info?: IPagination;
  errors?: string[];
  id: number;
  type: string;
}

export type IServerError = string;

export interface IErrorObject {
  message: string;
  code: string;
  param?: string;
}

export interface IApiResponseCollection<T> extends IApiResponse<T> {
  page_info: IPagination;
}
const HeaderText = styled("span")({
  display: "flex",
  alignItems: "center",
  "> span": { marginRight: "8px" },
});

const SubheaderText = styled(Typography)({
  alignItems: "center",
  color: JustiFiPalette.grey[700],
  display: "flex",
  flexWrap: "wrap",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.5",
});

const Payments = () => {
  const [params, setParams] = React.useState<any>({});
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState<IPagination>(
    new Pagination()
  );

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("paymentsResponse.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result: IApiResponseCollection<Payment[]> = await response.json();

      const fakePayments = result.data.map((dataItem) => new Payment(dataItem));
      setPayments(fakePayments);
      setPagination(result.page_info);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <AdminLayout>
      <Grid
        container
        sx={{ height: 155, backgroundColor: "white", padding: "32px" }}
      >
        <Grid item xs>
          <Typography variant="h4" sx={{ fontSize: "34px", color: "#004C4D" }}>
            <HeaderText>Payments</HeaderText>
          </Typography>
          <SubheaderText variant="h5">
            These are all the payments the seller has processed through JustiFi.
            The platform can hit our API to display this data in their UI for
            their sellers.
          </SubheaderText>
        </Grid>
        <PageTable
          collectionName={"Payments"}
          collection={payments}
          numberOfColumns={7}
          isLoading={isLoading}
          pagination={
            <PaginationComponent
              pagination={pagination}
              params={params}
              setParams={setParams}
            />
          }
          tableHeadRow={<PaymentsTableHeaderRow />}
          tableRowFunction={(data: Payment) => {
            return <PaymentsTableRow key={data.id} data={data} />;
          }}
        />
      </Grid>
    </AdminLayout>
  );
};

export default Payments;

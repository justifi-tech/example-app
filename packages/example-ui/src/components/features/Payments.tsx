import React, { useEffect } from "react";
import { Grid, Typography, styled } from "@mui/material";
import AdminLayout from "../common/AdminLayout";
import { PageTable } from "../common/PageTable";
import JustiFiPalette from "../common/JustiFiPallete";
import PaginationComponent, {
  Pagination,
} from "../common/PaginationComponent";
import { Payment } from "../../api/Payment";
import PaymentsTableRow from "../common/Payments/PaymentsTableRow";
import PaymentsTableHeaderRow from "../common/Payments/PaymentsTableHeaderRow";
import { HttpMethod, IApiResponse, IPagination, Api } from "../../api/Api";

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
  const api = Api();
  const [params, setParams] = React.useState<any>({});
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState<IPagination>(
    new Pagination()
  );

  useEffect(() => {
    const getData = async () => {
      const url = api.requestUrl("/v1/payments");
      const result = await api.makeRequest<IApiResponse<Payment[]>>(url, HttpMethod.Get);

      const payments = result.data.map((dataItem) => new Payment(dataItem));
      setPayments(payments);
      setPagination(new Pagination(result.pageInfo));
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

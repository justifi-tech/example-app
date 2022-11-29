import { useEffect, useState } from "react";
import { Grid, Typography, styled, Alert, Snackbar } from "@mui/material";
import AdminLayout from "../common/AdminLayout";
import { PageTable } from "../common/PageTable";
import JustiFiPalette from "../common/JustiFiPallete";
import { Event, listRecentEvents } from "../../api/Events";
import EventsTableHeaderRow from "../common/Events/EventsTableHeaderRow";
import EventsTableRow from "../common/Events/EventsTableRow";

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

const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    listRecentEvents().then((evts) => {
      setEvents(evts);
      setIsLoading(false);
    }).catch((e) => {
      setIsError(true);
      setIsLoading(false);
    })
  }, []);

  const onClearError = () => setIsError(false);

  return (
    <AdminLayout>
      <Grid
        container
        sx={{ height: 155, backgroundColor: "white", padding: "32px" }}
      >
        <Grid item xs>
          <Typography variant="h4" sx={{ fontSize: "34px", color: "#004C4D" }}>
            <HeaderText>Received Events</HeaderText>
          </Typography>
          <SubheaderText variant="h5">
            These are all the events the platform has received from JustiFi, based on the
            event publishers the platform created
          </SubheaderText>
        </Grid>
        <PageTable
          collectionName={"Events"}
          collection={events}
          numberOfColumns={4}
          isLoading={isLoading}
          tableHeadRow={<EventsTableHeaderRow />}
          tableRowFunction={(data: Event) => {
            return <EventsTableRow key={data.id} data={data} />;
          }}
        />
        <Snackbar
          open={isError}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={onClearError}
        >
          <Alert severity="error" onClose={onClearError}>
            We had a problem loading your most recent events, please try again later.
          </Alert>
        </Snackbar>
      </Grid>
    </AdminLayout>
  );
};

export default Events;

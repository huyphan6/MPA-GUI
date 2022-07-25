import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box
} from "@mui/material";

const Home = () => {

  const columns =  [
    {field: "recipientManager", headerName: "Recipient Manager"},
    {field: "reportName", headerName: "Report Name"},
    {field: "models", headerName: "Models"},
    {field: "reportType", headerName: "Report Type"},
    {field: "emailRecipients", headerName: "Email Recipients"},
    {field: "frequency", headerName: "Frequency"},
    {field: "instance", headerName: "Instance"},
    {field: "activationDate", headerName: "Activation Date"},
    {field: "action", headerName: "Action"}, 
  ]

  const rows = [
    { recipientManager: "Advisory Research", 
    reportName: "AdvisoryResearchMgt_AUM", 
    models: ["ADRESD", "ADREDSF", "ADRGSDADR"],
    reportType: "AUM", 
    emailRecipients: ["trading@advisoryreseach.com", "test@gmail.com"], 
    frequency: "Daily",
    instance: "Natixis",
    activationDate: "2017-09-10",
    action: "Edit"
    },
    { recipientManager: "Boston Partners", 
    reportName: "BOSLCV_SLEEVE", 
    models: ["BOSLCV"],
    reportType: "SLEEVE", 
    emailRecipients: ["trading@advisoryreseach.com", "test@gmail.com"], 
    frequency: "Daily",
    instance: "Natixis",
    activationDate: "2017-09-10",
    action: "Edit"
    } 
  ]

  return (
    <div>
      <Box
        component="homepage"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt={5}
        mx={"auto"}
      >
        <Typography variant="h4">MPA Home</Typography>

        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
      </Box>
    </div>
  );
}

export default Home;

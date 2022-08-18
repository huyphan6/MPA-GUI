import React, { useState } from "react"; 
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography, Box, Stack, Button, LinearProgress, AppBar, Toolbar, IconButton, Snackbar } from "@mui/material";
import NavBar from "../components/NavBar";
import axios from "../utils/axios";
import useToken from '../utils/useToken';

const Home = () => {
  const columns = [
    { field: "id", headerName: "ID", title: "ID" },
    {
      field: "recipientManager",
      headerName: "Recipient Manager",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "reportName",
      headerName: "Report Name",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "models",
      headerName: "Models",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "reportType",
      headerName: "Report Type",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "emailRecipients",
      headerName: "Email Recipients",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "instance",
      headerName: "Instance",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "activationDate",
      headerName: "Activation Date",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
  ]; 

  const [rows, setRows] = useState( () => [
    {
      id: 1,
      recipientManager: "Advisory Research",
      reportName: "AdvisoryResearchMgt_AUM",
      models: ["ADRESD", "ADREDSF", "ADRGSDADR"],
      reportType: "AUM",
      emailRecipients: ["trading@advisoryreseach.com", "test@gmail.com"],
      frequency: "Daily",
      instance: "Natixis",
      activationDate: "2017-09-10",
      action: "Edit",
    },
    {
      id: 2,
      recipientManager: "Boston Partners",
      reportName: "BOSLCV_SLEEVE",
      models: ["BOSLCV"],
      reportType: "SLEEVE",
      emailRecipients: ["trading@advisoryreseach.com", "test@gmail.com"],
      frequency: "Daily",
      instance: "Natixis",
      activationDate: "2017-09-10",
      action: "Edit",
    },
    {
      id: 3,
      recipientManager: "Denver",
      reportName: "DENVEST_MODEL",
      models: "DENSMV",
      reportType: "MODEL",
      emailRecipients: "vderryberry@sbhic.com",
      frequency: "Daily",
      instance: "Natixis",
      activationDate: "2019-08-13",
      action: "Edit",
    },
    {
      id: 4,
      recipientManager: "Paranassus",
      reportName: "PARCE_MODEL",
      models: "PARCE",
      reportType: "MODEL",
      emailRecipients: ["1", "2", "3"],
      frequency: "Daily",
      instance: "Natixis",
      activationDate: "2019-11-20",
      action: "Edit",
    }
  ] )

  const [idCounter, setIdCounter] = useState(5);

  const incrementIdCounter = () => {
    setIdCounter(idCounter + 1);
  }

  const createRandomRow = () => {
    incrementIdCounter();
    return {
      id: idCounter,
      recipientManager: "",
      reportName: "",
      models: "",
      reportType: "",
      emailRecipients: "",
      frequency: "",
      instance: "",
      activationDate: "",
      action: "" 
    };
  };

  const handleAddRow = () => {
    localStorage.setItem("rows", JSON.stringify(rows));
    setRows((prevRows) => [...prevRows, createRandomRow()]);
  };

  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <div>
      <NavBar />
      
      <Box mx={10}>
        <Box
          component="homepage"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mt={5}
          mx={"auto"}
        >
          {/* insert navbar here */}
        
          <Typography variant="h4" mb={5}>
            MPA Home
          </Typography>

          <Box
            display="flex"
            flexDirection="row"
            mb={5}
            mx={"auto"}
          >
            <Stack
              direction="row"
              flex={1}
            >
              <Button size="small" variant="contained" onClick={handleAddRow}>
                Add a row
              </Button>
            </Stack>
          </Box>

          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                LoadingOverlay: LinearProgress
              },
            }}
            processRowUpdate={handleAddRow}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight={true}
            
            autoPageSize={true}
            checkboxSelection={true}
            density={"comfortable"}
            editMode={"row"}
            experimentalFeatures={{ newEditingApi: true }}
            onSelectionModelChange={(ids) => {
              setSelectionModel(ids);
              console.log(ids)
            }}
            xs={12}
            sm={6}
            md={4}
            mt={5}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Home;

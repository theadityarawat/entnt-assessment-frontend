import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CommunicationModal from "./CommunicationModal";
import CommunicationCalendar from "./CommunicationCalendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [communications, setCommunications] = useState([]);
  const [over, setOver] = useState([]);
  const [today, setToday] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState([]);
  const [selected, setSelected] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleCommunicationPerformed = () => {
    const selectedIds = rowSelectionModel.map((id) => id.slice(24, id.length));
    const uniqueCompanies = Array.from(new Set(selectedIds)).map((id) => ({
      name: id,
    }));
    setSelectedCompanyId(uniqueCompanies);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogCommunication = (data) => {
    data.company.forEach((el) => {
      setCommunications((prev) => [
        ...prev,
        {
          company: { name: el.name },
          date: data.date,
          type: { name: data.type },
          notes: data.notes,
        },
      ]);
    });
  };

  const fetchCommsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://entnt-backend-i7my.onrender.com/api/communications-user"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching communications:", error);
    }
  };

  const fetchNotificationsFromAPI = async () => {
    try {
      const response = await axios.get(
        "https://entnt-backend-i7my.onrender.com/api/notifications"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const communicationsData = await fetchCommsFromAPI();
      setCommunications(communicationsData);
      const notifications = await fetchNotificationsFromAPI();
      setOver(notifications.filter((item) => item.type === "overdue"));
      setToday(notifications.filter((item) => item.type === "due today"));
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight="bold">{params.row.company.name}</Typography>
      ),
    },
    {
      field: "lastCommunications",
      headerName: "Last Communication",
      width: 300,
      renderCell: (params) => (
        <Typography>
          {`${params.row.type.name} - ${new Date(
            params.row.date
          ).toLocaleDateString()}`}
        </Typography>
      ),
    },
    {
      field: "nextCommunication",
      headerName: "Next Communication",
      width: 300,
      renderCell: (params) => {
        const nextDate = new Date(params.row.date);
        nextDate.setDate(nextDate.getDate() + 5);
        return (
          <Typography>
            {`${params.row.type.name} - ${nextDate.toLocaleDateString()}`}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#ff66b2", // Magenta color
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        sx={{
          backgroundColor: "#ffffff",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          User Dashboard
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ fontWeight: "bold" }}
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar Section */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader
              title="Communication Calendar"
              titleTypographyProps={{ fontWeight: "bold" }}
            />
            <CardContent>
              <CommunicationCalendar communications={communications} />
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader
              title="Overdue Communications"
              titleTypographyProps={{
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            />
            <CardContent>
              {over.length > 0 ? (
                over.map((item, idx) => (
                  <Typography key={idx}>
                    {idx + 1}. {item.company.name} - {item.message}
                  </Typography>
                ))
              ) : (
                <Typography>No overdue communications</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader
              title="Today's Communications"
              titleTypographyProps={{
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            />
            <CardContent>
              {today.length > 0 ? (
                today.map((item, idx) => (
                  <Typography key={idx}>
                    {idx + 1}. {item.company.name} - {item.message}
                  </Typography>
                ))
              ) : (
                <Typography>No communications due today</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Communication History Section */}
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={3}
            color="text.primary"
          >
            Communication History
          </Typography>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={communications}
                getRowId={(row) => row._id + row.company.name}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                  setSelected(newRowSelectionModel.length > 0);
                }}
                rowSelectionModel={rowSelectionModel}
              />
            </div>
          </Paper>
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              disabled={!selected}
              onClick={handleCommunicationPerformed}
            >
              Log Communication
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Modal */}
      <CommunicationModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleLogCommunication}
        company={selectedCompanyId}
      />
    </Box>

  );
};


export default UserDashboard;

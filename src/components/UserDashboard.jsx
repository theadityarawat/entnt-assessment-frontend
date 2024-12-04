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
  const [records, setRecords] = useState([]);
  const [pastDue, setPastDue] = useState([]);
  const [dueToday, setDueToday] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleLogAction = () => {
    const companyIds = selectedRows.map((id) => id.slice(24));
    const distinctCompanies = Array.from(new Set(companyIds)).map((id) => ({
      name: id,
    }));
    setSelectedCompanies(distinctCompanies);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCommunication = (data) => {
    data.company.forEach((item) => {
      setRecords((prev) => [
        ...prev,
        {
          company: { name: item.name },
          date: data.date,
          type: { name: data.type },
          notes: data.notes,
        },
      ]);
    });
  };

  const fetchCommunicationData = async () => {
    try {
      const response = await axios.get(
        "https://entnt-assessment-backend.onrender.com/api/communications-user"
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching communication data:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://entnt-assessment-backend.onrender.com/api/notifications"
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const communications = await fetchCommunicationData();
      setRecords(communications);
      const notifications = await fetchNotifications();
      setPastDue(notifications.filter((n) => n.type === "overdue"));
      setDueToday(notifications.filter((n) => n.type === "due today"));
    };
    fetchAllData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Company",
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight="bold">{params.row.company.name}</Typography>
      ),
    },
    {
      field: "lastInteraction",
      headerName: "Last Contact",
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
      field: "upcomingInteraction",
      headerName: "Next Interaction",
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
        backgroundColor: "#e0f7fa", // Light Cyan
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
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleSignOut}
          sx={{ fontWeight: "bold" }}
        >
          Sign Out
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar Section */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader
              title="Activity Calendar"
              titleTypographyProps={{ fontWeight: "bold" }}
            />
            <CardContent>
              <CommunicationCalendar communications={records} />
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader
              title="Pending Follow-ups"
              titleTypographyProps={{
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            />
            <CardContent>
              {pastDue.length > 0 ? (
                pastDue.map((item, idx) => (
                  <Typography key={idx}>
                    {idx + 1}. {item.company.name} - {item.message}
                  </Typography>
                ))
              ) : (
                <Typography>No overdue items</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader
              title="Today's Agenda"
              titleTypographyProps={{
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            />
            <CardContent>
              {dueToday.length > 0 ? (
                dueToday.map((item, idx) => (
                  <Typography key={idx}>
                    {idx + 1}. {item.company.name} - {item.message}
                  </Typography>
                ))
              ) : (
                <Typography>No activities scheduled for today</Typography>
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
            Communication Records
          </Typography>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={records}
                getRowId={(row) => row._id + row.company.name}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedRows(newSelection);
                  setIsSelected(newSelection.length > 0);
                }}
                rowSelectionModel={selectedRows}
              />
            </div>
          </Paper>
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              disabled={!isSelected}
              onClick={handleLogAction}
            >
              Add Record
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Modal */}
      <CommunicationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveCommunication}
        company={selectedCompanies}
      />
    </Box>
  );
};

export default UserDashboard;

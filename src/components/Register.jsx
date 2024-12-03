import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";  // Import Particles component
import { loadFull } from "tsparticles";  // Load full particle options


const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://entnt-backend-i7my.onrender.com/api/register", formData);
      console.log(response);
      navigate("/");
    } catch (error) {
      alert("Error registering user: " + (error.response?.data?.error || "An unexpected error occurred."));
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);  // Initialize full particle library
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },  // Make sure particles are in the background
          particles: {
            number: {
              value: 60,  // Number of particles
              density: {
                enable: true,
                value_area: 800,  // Area to contain particles
              },
            },
            shape: {
              type: "circle",  // Shape of particles
            },
            size: {
              value: 3,  // Size of the particles
            },
            move: {
              enable: true,
              speed: 1.5,  // Particle speed
              direction: "random",  // Random direction of particle movement
              outMode: "out",  // Particles will leave the screen at edges
            },
            opacity: {
              value: 0.5,  // Opacity of particles
              anim: {
                enable: true,
                speed: 1,  // Opacity animation speed
                opacity_min: 0.1,  // Minimum opacity
              },
            },
          },
        }}
      />

      {/* Main Content */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 450,
          padding: 5,
          borderRadius: 4,
          backgroundColor: "white",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.15)",  // Deeper shadow
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: "#7b1fa2", fontFamily: "Roboto, sans-serif" }}
        >
          Create Account
        </Typography>
        <Divider sx={{ marginBottom: 3, bgcolor: "#d1c4e9" }} />

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            bgcolor: "#f3e5f5",
            borderRadius: 1.5,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#7b1fa2",  // Border color for input
              },
            },
            "&:hover .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ab47bc", // Hover border color
              },
            },
          }}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          sx={{
            bgcolor: "#f3e5f5",
            borderRadius: 1.5,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#7b1fa2",  // Border color for password input
              },
            },
            "&:hover .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ab47bc", // Hover border color
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          sx={{
            marginTop: 3,
            padding: "12px 0",
            background: "linear-gradient(90deg, #7b1fa2, #ab47bc)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: 2.5,
            boxShadow: "0 6px 12px rgba(123, 31, 162, 0.3)",
            "&:hover": {
              background: "#6a1b9a",  // Darker on hover
              boxShadow: "0 8px 16px rgba(106, 27, 154, 0.4)",
            },
            transition: "all 0.3s ease",  // Smooth hover effect
          }}
        >
          Register
        </Button>

        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Typography variant="body1">
            Already have an account?{" "}
            <Button
              color="primary"
              size="small"
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                padding: 0,
                color: "#7b1fa2",
                fontWeight: "bold",
                "&:hover": { color: "#6a1b9a" },
                transition: "color 0.3s ease",  // Smooth hover color change
              }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;

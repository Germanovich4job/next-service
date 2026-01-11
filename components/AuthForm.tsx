"use client";
import { TextField, Button, Paper, Grid } from "@mui/material";

import { useState } from "react";

const AuthForm = ({ mode }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        alert("Successfully logged in!");
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Paper elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="User name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            {mode === "register" ? "Register" : "Login"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AuthForm;

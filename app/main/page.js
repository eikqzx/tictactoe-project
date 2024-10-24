"use client";
import React from "react";
import { Grid } from "@mui/joy";
import GameBoard from "../components/GameBoard/page";
import Scoreboard from "../components/Scoreboard/page";

function MainPage() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "16px",
        marginTop: "80px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Grid
        xs={12} sm={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scoreboard />
      </Grid>

      <Grid
        xs={12} sm={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          padding: '0 16px',
        }}
      >
        <GameBoard />
      </Grid>
    </Grid>
  );
}

export default MainPage;

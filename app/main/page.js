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
        minHeight: "100vh",  // Ensure full height of the viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",  // Align items to the top for better layout control
      }}
    >
      {/* Scoreboard positioned on the left on larger screens */}
      <Grid
        xs={12} sm={4}  // Full width on mobile, 1/3 on larger screens
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scoreboard />
      </Grid>

      {/* Game board takes up the rest of the space */}
      <Grid
        xs={12} sm={8}  // Full width on mobile, 2/3 on larger screens
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',  // Stack items vertically
          height: '100%',  // Fill the available height
          padding: '0 16px',
        }}
      >
        <GameBoard />
      </Grid>
    </Grid>
  );
}

export default MainPage;

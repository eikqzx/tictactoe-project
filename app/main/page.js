"use client";
import React from "react";
import { Grid } from "@mui/joy";
import GameBoard from "../components/GameBoard/page";

function MainPage() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: "16px", marginTop: "80px", height: "calc(100vh - 80px)" }}
    >
      <Grid
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <GameBoard />
      </Grid>
    </Grid>
  );
}

export default MainPage;

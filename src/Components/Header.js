import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: "flex" }}
          >
            TODO APP
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

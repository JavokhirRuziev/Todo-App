import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import styled from "styled-components";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    columnGap: "20px",
  }));
  const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: "50px",
  }));
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <StyledToolbar>
            <Typography variant="h5" fontWeight={"bold"}>
              Todos
            </Typography>
          </StyledToolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <StyledContainer>{props.children}</StyledContainer>
    </React.Fragment>
  );
}

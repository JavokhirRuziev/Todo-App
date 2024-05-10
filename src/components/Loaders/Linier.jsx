import LinearProgress from "@mui/material/LinearProgress";
import styled from "styled-components";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const StyledLinier = styled(LinearProgress)(() => ({
    position: "fixed",
    top: 56,
  }));
  return <StyledLinier color="secondary" />;
};

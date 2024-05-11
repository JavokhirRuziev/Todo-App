import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Edit from "@mui/icons-material/Edit";
import Done from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { ReactComponent as Empty } from "../assest/icons/empty.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ActionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  columnGap: "15px",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const MobileWrapper = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  columnGap: "20px",
  rowGap: "20px",
  margin: "auto",
  justifyContent: "center",
  padding: "8px",
}));
const TextWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const EmptyWrapper = styled(Box)(() => ({
  margin: "20px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledCard = styled(Card)(() => ({
  maxWidth: 570,
  width: "100%",
  minWidth: 275,
  boxShadow: "none",
}));

const emptyStyles = {
  width: "150px",
  maxHeight: "100px",
  height: "100%",
};

const CardText = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: "bold",
}));

const ActionButtonsWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  p: 1,
}));

const EmptyText = styled(Typography)(() => ({
  fontWeight: "bold",
  color: "GrayText",
}));

export default function CustomizedTables({
  arr = [],
  onEdit,
  onRemove,
  onDone,
}) {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("tablet"));

  return (
    <>
      {!mobile ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arr?.map((row) => {
                return (
                  <StyledTableRow key={row.name} sx={completedBg(row)}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={completedStyles(row)}
                    >
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right" sx={completedStyles(row)}>
                      {row.category?.label}
                    </StyledTableCell>
                    <StyledTableCell align="right" sx={completedStyles(row)}>
                      {row.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionWrapper>
                        <Tooltip
                          title="Edit"
                          sx={{ cursor: "pointer" }}
                          placement="top"
                        >
                          <IconButton
                            color="secondary"
                            onClick={() => onEdit(row)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Done"
                          sx={{ cursor: "pointer" }}
                          placement="top"
                        >
                          <IconButton
                            color={row?.completed ? "error" : "success"}
                            onClick={() => onDone(row)}
                          >
                            {row?.completed ? <CancelIcon /> : <Done />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Remove"
                          sx={{ cursor: "pointer" }}
                          placement="top"
                        >
                          <IconButton
                            color="primary"
                            onClick={() => onRemove(row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ActionWrapper>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
          {arr?.length < 1 && (
            <EmptyWrapper>
              <EmptyText variant="h3">Empty</EmptyText>
              <Empty style={emptyStyles} />
            </EmptyWrapper>
          )}
        </TableContainer>
      ) : (
        <Paper>
          {arr?.length < 1 && (
            <MobileWrapper>
              <StyledCard>
                <CardContent>
                  <EmptyWrapper>
                    <EmptyText variant="h3">Empty</EmptyText>
                    <Empty style={emptyStyles} />
                  </EmptyWrapper>
                </CardContent>
              </StyledCard>
            </MobileWrapper>
          )}
          <MobileWrapper>
            {arr?.map((row, index) => (
              <>
                <StyledCard sx={completedBg(row)}>
                  <CardContent>
                    <TextWrapper>
                      <CardText color="text.secondary" gutterBottom>
                        Name
                      </CardText>{" "}
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {row.name}
                      </Typography>
                    </TextWrapper>
                    <TextWrapper>
                      <CardText color="text.secondary" gutterBottom>
                        Category
                      </CardText>{" "}
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {row.category?.label}
                      </Typography>
                    </TextWrapper>
                    <TextWrapper>
                      <CardText color="text.secondary" gutterBottom>
                        Date
                      </CardText>{" "}
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {row.date}
                      </Typography>
                    </TextWrapper>
                  </CardContent>
                  <CardActions>
                    <ActionButtonsWrapper>
                      <IconButton color="primary" onClick={() => onRemove(row)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color={row?.completed ? "error" : "success"}
                        onClick={() => onDone(row)}
                      >
                        {row?.completed ? <CancelIcon /> : <Done />}
                      </IconButton>
                      <IconButton color="secondary" onClick={() => onEdit(row)}>
                        <Edit />
                      </IconButton>
                    </ActionButtonsWrapper>
                  </CardActions>
                  {arr?.length !== index + 1 && <Divider />}
                </StyledCard>
              </>
            ))}
          </MobileWrapper>
        </Paper>
      )}
    </>
  );
}

const completedStyles = (row) => ({
  textDecoration: row?.completed ? "line-through" : "unset",
});

const completedBg = (row) => ({
  bgcolor: row?.completed ? "#dbffd4" : "white",
});

import Layout from "../../components/Layout/index";
import Table from "../../components/Table";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Modal from "../../components/Modals/ModalBase";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Remove from "./components/Remove";
import Filters from "./components/Filters";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import { Add } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Box from "@mui/material/Box";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [searchParams] = useSearchParams();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("tablet"));
  const name = searchParams.get("name");
  const categoryParam = searchParams.get("category");
  const date = searchParams.get("date");
  const todos = useSelector((state) => state.todos.todos);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const openEditModal = (e) => {
    setShowEdit(true);
    setSelected(e);
  };
  const openFilterModal = (e) => {
    setShowFilters(true);
  };
  const openCreateModal = () => {
    setShowCreate(true);
  };
  const openRemoveModal = (e) => {
    setShowRemove(true);
    setSelected(e);
  };
  useEffect(() => {
    const filterTodos = () => {
      setFilteredTodos(
        todos.filter((todo) => {
          const lowerCaseName = todo?.name?.toLowerCase();
          const lowerCaseDate = todo?.date?.toLowerCase();
          const categoryId = todo?.category?.value.toString();

          const nameMatch =
            !name || lowerCaseName?.includes(name?.toLowerCase());
          const dateMatch =
            !date || lowerCaseDate?.includes(date?.toLowerCase());
          const categoryMatch = !categoryParam || categoryId === categoryParam;

          return nameMatch && dateMatch && categoryMatch;
        })
      );
    };

    filterTodos();
  }, [name, date, categoryParam, todos]);

  return (
    <>
      <Modal open={showRemove} setOpen={setShowRemove} maxHeight={200}>
        <Remove {...{ setShowRemove, selected }} />
      </Modal>
      <Modal open={showFilters} setOpen={setShowFilters} maxHeight={500}>
        <Filters
          onCreate={openCreateModal}
          {...{ name, categoryParam, date, setShowFilters }}
        />
      </Modal>
      <Modal open={showEdit} setOpen={setShowEdit}>
        <Edit {...{ setShowEdit, selected }} />
      </Modal>
      <Modal open={showCreate} setOpen={setShowCreate}>
        <Create {...{ setShowCreate }} />
      </Modal>
      <Layout>
        {mobile ? (
          <Paper>
            <Wrapper>
              <Button
                onClick={openFilterModal}
                startIcon={<FilterListTwoToneIcon />}
                color="info"
                variant="contained"
              >
                Filters
              </Button>
              <Tooltip title="Add" placement="top">
                <Button
                  variant="contained"
                  size="small"
                  onClick={openCreateModal}
                >
                  <Add />
                </Button>
              </Tooltip>
            </Wrapper>
          </Paper>
        ) : (
          <Filters
            onCreate={openCreateModal}
            {...{ name, categoryParam, date, setShowFilters }}
          />
        )}
        <Table
          onEdit={openEditModal}
          onRemove={openRemoveModal}
          arr={filteredTodos}
        />
      </Layout>
    </>
  );
};

const Wrapper = styled(Box)(() => ({
  display: "flex",
  rowGap: "10px",
  margin: "30px 0px",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px",
}));

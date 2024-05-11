import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import styled from "styled-components";
import Base from "../../../components/Fields/Base";
import { todoCategories } from "../../../data/categories";
import Paper from "@mui/material/Paper";
import { Add } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { theme } from "../../../theme";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ onCreate, name, categoryParam, date, setShowFilters }) => {
  const navigate = useNavigate();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("tablet"));
  const category = todoCategories.find(
    (el) => el?.value === Number(categoryParam)
  );
  const Wrapper = styled(Box)(() => ({
    display: "flex",
    rowGap: "10px",
    margin: "30px 0px",
    width: "100%",
    justifyContent: "space-between",
    alignItems: mobile ? "unset" : "center",
    padding: "5px 15px",
    flexDirection: mobile ? "column" : "row",
  }));
  const InputWrapper = styled(Box)(() => ({
    width: "100%",
    maxWidth: 500,
  }));
  const InputContainer = styled(Box)(() => ({
    display: "flex",
    columnGap: 15,
    width: mobile ? "100%" : "70%",
    flexDirection: mobile ? "column" : "row",
  }));
  const ActionsWrapper = styled(Box)(() => ({
    marginTop: 15,
    display: "flex",
    columnGap: "5px",
  }));

  return (
    <Formik
      initialValues={{ name, category, date }}
      onSubmit={(values, { setSubmitting }) => {
        let route = "/";
        if (values?.name) {
          route += `?name=${values.name}`;
        }
        if (values?.category?.value) {
          route += `${route.includes("?") ? "&" : "?"}category=${
            values.category.value
          }`;
        }
        if (values?.date) {
          route += `${route.includes("?") ? "&" : "?"}date=${values.date}`;
        }
        navigate(route);
        setTimeout(() => {
          setShowFilters(false);
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ isSubmitting, setFieldValue }) => {
        return (
          <Paper
            sx={{
              boxShadow: {
                mobile: "none",
                desktop: theme.shadows[1],
                tablet: theme.shadows[1],
              },
            }}
          >
            <Form>
              <Wrapper>
                <InputContainer>
                  <InputWrapper>
                    <Field
                      component={Base}
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      label="Name"
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <Field
                      component={Base}
                      type="select"
                      name="category"
                      placeholder="Enter category"
                      label="Category"
                      options={todoCategories}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <Field
                      component={Base}
                      type="date"
                      name="date"
                      placeholder="Enter date"
                      label="Date"
                    />
                  </InputWrapper>
                </InputContainer>
                <ActionsWrapper>
                  <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    sx={{ ml: 1 }}
                  >
                    Search
                  </Button>
                  <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setFieldValue("name", "");
                      setFieldValue("category", "");
                      setFieldValue("date", "");
                    }}
                  >
                    Clear
                  </Button>
                  {!mobile && (
                    <Tooltip title="Add" placement="top">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={onCreate}
                      >
                        <Add />
                      </Button>
                    </Tooltip>
                  )}
                </ActionsWrapper>
              </Wrapper>
            </Form>
          </Paper>
        );
      }}
    </Formik>
  );
};

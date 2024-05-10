import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import Loader from "../../../components/Loaders/Loader";
import styled from "styled-components";
import Base from "../../../components/Fields/Base";
import { useDispatch } from "react-redux";
import { create } from "../../../store/slices";
import { todoCategories } from "../../../data/categories";
import { success } from "../../../utils/notification/notifications";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ setShowCreate }) => {
  const Wrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    margin: "30px 0px",
  }));
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h4" component="h2" textAlign={"center"}>
        Create
      </Typography>
      <Formik
        initialValues={{ name: "", category: "", date: "" }}
        validate={(values) => validations(values)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(create(values));
          setTimeout(() => {
            setSubmitting(false);
            setShowCreate(false);
            success();
          }, 500);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <>
              <Form>
                <Wrapper>
                  <Field
                    component={Base}
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                  />
                  <Field
                    component={Base}
                    type="select"
                    name="category"
                    placeholder="Enter category"
                    label="Category"
                    options={todoCategories}
                  />
                  <Field
                    component={Base}
                    type="date"
                    name="date"
                    placeholder="Enter date"
                    label="Date"
                  />
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader /> : "Submit"}
                  </Button>
                </Wrapper>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

const validations = (values) => {
  const errors = {};
  for (const value in values) {
    if (!values[value]) {
      errors[value] = "Required!";
    }
  }
  return errors;
};

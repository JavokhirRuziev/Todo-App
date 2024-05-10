/* eslint-disable import/no-anonymous-default-export */
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import Loader from "../../../components/Loaders/Loader";
import styled from "styled-components";
import Base from "../../../components/Fields/Base";
import { useDispatch } from "react-redux";
import { edit } from "../../../store/slices";
import { todoCategories } from "../../../data/categories";
import { success } from "../../../utils/notification/notifications";

export default ({ setShowEdit, selected }) => {
  const dispatch = useDispatch();
  const Wrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    margin: "30px 0px",
  }));

  return (
    <>
      <Typography variant="h4" component="h2" textAlign={"center"}>
        Edit
      </Typography>
      <Formik
        initialValues={{
          name: selected?.name,
          category: selected?.category,
          date: selected?.date,
        }}
        validate={(values) => validations(values)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(edit({ ...values, id: selected?.id }));
          setTimeout(() => {
            setSubmitting(false);
            setShowEdit(false);
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

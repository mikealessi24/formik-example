import React from "react";
import { Formik, Field } from "formik";
import { TextField, Button } from "@material-ui/core";

function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          //make async call
          console.log(data);
          //call finished
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {/* as is used to use a specific component Ex. material-ui TextField */}
            <Field
              placeholder="first name"
              name="firstName"
              type="input"
              as={TextField}
            />
            <Field
              placeholder="last name"
              name="lastName"
              type="input"
              as={TextField}
            />
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;

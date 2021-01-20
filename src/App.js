import React from "react";
import { Formik, Field, Form, useField } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

function MyRadio({ label, ...props }) {
  const [field] = useField(props);

  return <FormControlLabel {...field} control={<Radio />} label={label} />;
}

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: "",
        }}
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
          <Form>
            {/* as is used to use a specific component Ex. material-ui TextField */}
            <Field
              placeholder="first name"
              name="firstName"
              type="input"
              as={TextField}
            />
            <div>
              <Field
                placeholder="last name"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>
            <Field name="isTall" type="checkbox" as={Checkbox} />
            <div>cookies:</div>
            {/* this works as a group as long as the Fields all have the same name */}
            <Field
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="oatmeal raisin"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="peanutbutter"
              as={Checkbox}
            />
            <div>yogurt</div>
            <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
            <MyRadio
              name="yogurt"
              type="radio"
              value="blueberry"
              label="blueberry"
            />
            <MyRadio
              name="yogurt"
              type="radio"
              value="blackberry"
              label="blackberry"
            />

            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;

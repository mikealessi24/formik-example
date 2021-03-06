import React from "react";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import * as yup from "yup";

function MyRadio({ label, ...props }) {
  // use this useField hook to get access to the built in Field props
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
}

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return <TextField {...field} helperText={errorText} error={!!errorText} />;
};

const validationSchema = yup.object({
  firstName: yup.string().required().min(2).max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

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
          pets: [{ type: "dog", name: "luna", id: "" + Math.random() }],
        }}
        // validate={(values) => {
        //   const errors = {};

        //   if (values.firstName.includes("mike")) {
        //     errors.firstName = "error, no mike";
        //   }
        //   return errors;
        // }}

        // formik takes a validation schema prop, this one is using yup
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          //make async call
          console.log(data);
          //call finished
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            {/* as is used to use a specific component Ex. material-ui TextField */}
            <MyTextField
              placeholder="first name"
              name="firstName"
              type="input"
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

            <FieldArray name="pets">
              {(arrayHelpers) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        type: "fish",
                        name: "",
                        id: "" + Math.random(),
                      })
                    }
                  >
                    Add pet
                  </Button>
                  {values.pets.map((pets, index) => {
                    return (
                      <div key={pets.id}>
                        <MyTextField
                          name={`pets.${index}.name`}
                          placeholder="pet name"
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">Cat</MenuItem>
                          <MenuItem value="dog">Dog</MenuItem>
                          <MenuItem value="fish">Fish</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>

            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;

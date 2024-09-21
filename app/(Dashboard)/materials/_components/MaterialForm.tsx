import React from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { Material } from "@/types/types";
import { ModalListIcon } from "@/app/icons";

const MaterialForm: React.FC<FormikProps<Material>> = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
    
      <div className="mb-3">
        <div className="relative">
          <ModalListIcon />
          <Field
            type="text"
            name="name"
            placeholder="Material Name"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched.name && errors.name ? "border-red-500" : ""
            }`}
          />
        </div>
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm mt-1 "
        />
      </div>

      <div className="mb-3">
        <div className="relative">
        <ModalListIcon />
          <Field
            type="text"
            name="unitType"
            placeholder="Unit type"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched && errors ? "border-red-500" : ""
            }`}
          />
        </div>
        <ErrorMessage
          name="unitType"
          component="div"
          className="text-red-500 text-sm mt-1 "
        />
      </div>

     

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle mr-4"></span>
        )}
        {isSubmitting ? "LOADING.." : "SUBMIT"}
      </button>
    </Form>
  );
};

export default MaterialForm;

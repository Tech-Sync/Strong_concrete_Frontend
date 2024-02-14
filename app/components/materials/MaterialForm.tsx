import React from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
// import { firmStatuses } from "@/app/constraints/roles&status";
// import {
//   AddressIcon,
//   EmailIcon,
//   NameIcon,
//   PhoneIcon,
//   StatusIcon,
//   TpinIcon,
// } from "./FirmModalIcons";
import { Material } from "@/types/types";

interface FormValues {
  name: string;
  address: string;
  phoneNo: string;
  tpinNo: string;
  email: string;
  status: string;
}

const MaterialForm: React.FC<FormikProps<Material>> = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        {/* <StatusIcon /> */}
        <div
          className={`${touched && errors ? "has-error" : ""}`}
        >
          {/* <Field
            as="select"
            name="status"
            id="gridState"
            className=" form-select ltr:pl-10 rtl:pr-10 text-white-dark "
          >
            <option value="" disabled >
              Describe Firm
            </option>
            <option value={1}>{firmStatuses[1]}</option>
            <option value={2}>{firmStatuses[2]}</option>
          </Field> */}
        </div>
      </div>
      <div className="mb-3">
        <div className="relative">
          {/* <NameIcon /> */}
          <Field
            type="text"
            name="name"
            placeholder="Firm Name"
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
          {/* <AddressIcon /> */}
          <Field
            type="text"
            name="address"
            placeholder="Firm Address"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched && errors ? "border-red-500" : ""
            }`}
          />
        </div>
        <ErrorMessage
          name="address"
          component="div"
          className="text-red-500 text-sm mt-1 "
        />
      </div>

      <div className="mb-3">
        <div className="relative">
          {/* <PhoneIcon /> */}
          <Field
            type="text"
            name="phoneNo"
            placeholder="Firm Phone Number"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched && errors ? "border-red-500" : ""
            }`}
          />
        </div>
        <ErrorMessage
          name="phoneNo"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div className="mb-3">
        <div className="relative">
          {/* <EmailIcon /> */}
          <Field
            type="email"
            name="email"
            placeholder="Firm Email"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched && errors ? "border-red-500" : ""
            }`}
          />
        </div>
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
      <div className="mb-3">
        <div className="relative">
          {/* <TpinIcon /> */}
          <Field
            type="text"
            name="tpinNo"
            placeholder="Firm Tpin Number"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched && errors ? "border-red-500" : ""
            }`}
          />
        </div>
        <ErrorMessage
          name="tpinNo"
          component="div"
          className="text-red-500 text-sm mt-1"
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

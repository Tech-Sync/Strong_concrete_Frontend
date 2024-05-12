import React from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { productionStatuses } from "@/app/constraints/roles&status";
import {
  AddressIcon,
  EmailIcon,
  NameIcon,
  PhoneIcon,
  StatusIcon,
  TpinIcon,
} from "./ProductionModalIcons";
import { Production } from "@/types/types";



const ProductionForm: React.FC<FormikProps<Production>> = ({ touched, errors, isSubmitting, handleSubmit, }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <StatusIcon />
        <div
          className={`${touched.status && errors.status ? "has-error" : ""}`}
        >
          <Field
            as="select"
            name="status"
            id="gridState"
            className=" form-select ltr:pl-10 rtl:pr-10 text-white-dark "
          >
            <option value="" disabled >
              Describe Production
            </option>
            <option value={1}>{productionStatuses[1]}</option>
            <option value={2}>{productionStatuses[2]}</option>
          </Field>
        </div>
      </div>
      <div className="mb-3">
        <div className="relative">
          <NameIcon />
          <Field
            type="text"
            name="name"
            placeholder="Production Name"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.name && errors.name ? "border-red-500" : ""
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
          <AddressIcon />
          <Field
            type="text"
            name="address"
            placeholder="Production Address"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.address && errors.address ? "border-red-500" : ""
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
          <PhoneIcon />
          <Field
            type="text"
            name="phoneNo"
            placeholder="Production Phone Number"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.phoneNo && errors.phoneNo ? "border-red-500" : ""
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
          <EmailIcon />
          <Field
            type="email"
            name="email"
            placeholder="Production Email"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.email && errors.email ? "border-red-500" : ""
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
          <TpinIcon />
          <Field
            type="text"
            name="tpinNo"
            placeholder="Production Tpin Number"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.tpinNo && errors.tpinNo ? "border-red-500" : ""
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

export default ProductionForm;

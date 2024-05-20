import React from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { firmStatuses } from "@/app/constraints/roles&status";
import { AddressIcon, EmailIcon, NameIcon, PhoneIcon, StatusIcon, TpinIcon, } from "./FirmModalIcons";
import { Firm } from "@/types/types";
import Select from 'react-select';
import MaskedInput from 'react-text-mask';


const FirmForm: React.FC<FormikProps<Firm>> = ({ touched, errors, isSubmitting, handleSubmit, values, setFieldValue }) => {

  const firmOp = [
    { value: 1, label: firmStatuses[1] },
    { value: 2, label: firmStatuses[2] },
  ]

  const maskConfig = {
    'phoneNo': {
      mask: [
        '+',
        /\d/, /\d/, /\d/, // Allow up to three digits for the country code
        '-',
        /\d/, /\d/, /\d/, // First group of three digits
        '-',
        /\d/, /\d/, /\d/, // Second group of three digits
        '-',
        /\d/, /\d/, /\d/  // Third group of three digits
      ],
      placeholder: '+___-___-___-___'
    },
    'tpinNo': {
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
      placeholder: '________'
    },
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <div className={`${touched.status && errors.status ? "has-error" : ""}`}>
          <Select placeholder="Describe Firm" options={firmOp} id='Gender'
            value={firmOp.find(option => option.value === values.status)}
            onChange={option => setFieldValue('gender', option ? option.value : '')}
            className="text-white-dark "
            required />
        </div>
      </div>
      <div className="mb-3">
        <div className="relative">
          <NameIcon />
          <Field
            type="text"
            name="name"
            placeholder="Firm Name"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.name && errors.name ? "border-red-500" : ""}`} />
        </div>
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm mt-1 " />
      </div>

      <div className="mb-3">
        <div className="relative">
          <AddressIcon />
          <Field
            type="text"
            name="address"
            placeholder="Firm Address"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.address && errors.address ? "border-red-500" : ""}`} />
        </div>
        <ErrorMessage
          name="address"
          component="div"
          className="text-red-500 text-sm mt-1 " />
      </div>

      <div className="mb-3">
        <div className="relative">
          <PhoneIcon />
          <Field
            as={MaskedInput}
            id="phoneNo"
            name="phoneNo"
            type="text"
            placeholder={maskConfig.phoneNo.placeholder}
            className={`form-input pl-10 ${touched.phoneNo && errors.phoneNo ? "border-red-500" : ""}`}
            required
            mask={maskConfig.phoneNo.mask} />
        </div>
        <ErrorMessage
          name="phoneNo"
          component="div"
          className="text-red-500 text-sm mt-1" />
      </div>
      <div className="mb-3">
        <div className="relative">
          <EmailIcon />
          <Field
            type="email"
            name="email"
            placeholder="Firm Email"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.email && errors.email ? "border-red-500" : ""}`} />
        </div>
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-sm mt-1" />
      </div>
      <div className="mb-3">
        <div className="relative">
          <TpinIcon />
          <Field
            as={MaskedInput}
            id="tpinNo"
            name="tpinNo"
            type="text"
            placeholder={maskConfig.tpinNo.placeholder}
            className={`form-input pl-10 ${touched.tpinNo && errors.tpinNo ? "border-red-500" : ""}`} required mask={maskConfig.tpinNo.mask} />
        </div>
        <ErrorMessage
          name="tpinNo"
          component="div"
          className="text-red-500 text-sm mt-1" />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}>
        {isSubmitting && (
          <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle mr-4"></span>
        )}
        {isSubmitting ? "LOADING.." : "SUBMIT"}
      </button>
    </Form>
  );
};

export default FirmForm;

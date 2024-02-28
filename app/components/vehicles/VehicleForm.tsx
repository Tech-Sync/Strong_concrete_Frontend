import React, { useEffect } from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { AddressIcon, EmailIcon, NameIcon, PhoneIcon, StatusIcon, TpinIcon, } from "./VehicleModalIcons";
import { Vehicle } from "@/types/types";
import Select from 'react-select';
import { getAllFrimAsync, getAllMaterialAsync, selectFirms, selectMaterials, useDispatch, useSelector } from "@/lib/redux";


interface FormValues {
  name: string;
  address: string;
  phoneNo: string;
  tpinNo: string;
  email: string;
  status: string;
}

const VehicleForm: React.FC<FormikProps<Vehicle>> = ({ touched, errors, isSubmitting, handleSubmit, setFieldValue, values }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllFrimAsync());
    dispatch(getAllMaterialAsync());
  }, [dispatch]);

  const firms = useSelector(selectFirms);
  const materials = useSelector(selectMaterials);


  const firmOptions = firms?.filter(firm => firm.status === 2)?.map(firm => ({
    value: firm.id,
    label: firm.name
  }))
  const materialOptions = materials?.map(material => ({
    value: material.id,
    label: material.name,
  }))


  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex gap-x-2 mb-3">

      </div>
      <div className="relative mb-4">
        <StatusIcon />
        <div
          className={`${touched.status && errors.status ? "has-error" : ""}`}
        >
          <Select name='FirmId'
            //@ts-ignore
            value={firmOptions.find(option => option.value === values.FirmId)}
            onChange={option => setFieldValue('FirmId', option ? Number(option.value) : '')}
            className='form-input' placeholder="Select a Firm" options={firmOptions} />
        </div>
      </div>
      <div className="mb-3">
        <div className="relative">
          <NameIcon />
          <Field
            type="text"
            name="plateNumber"
            placeholder="Plate Number"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.plateNumber && errors.plateNumber ? "border-red-500" : ""
              }`}
          />
        </div>
        <ErrorMessage
          name="plateNumber"
          component="div"
          className="text-red-500 text-sm mt-1 "
        />
      </div>

      <div className="mb-3">
        <div className="relative">
          <AddressIcon />
          <Field
            type="number"
            name="model"
            placeholder="Model"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.model && errors.model ? "border-red-500" : ""
              }`}
          />
        </div>
        <ErrorMessage
          name="model"
          component="div"
          className="text-red-500 text-sm mt-1 "
        />
      </div>

      <div className="mb-3">
        <div className="relative">
          <PhoneIcon />
          <Field
            type="number"
            name="capacity"
            placeholder="Capacity (m3)"
            className={`form-input ltr:pl-10 rtl:pr-10${touched.capacity && errors.capacity ? "border-red-500" : ""
              }`}
          />
        </div>
        <ErrorMessage
          name="capacity"
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
            placeholder="Firm Email"
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
            placeholder="Firm Tpin Number"
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

export default VehicleForm;

import React, { useEffect, useState } from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { AddressIcon, NameIcon, PhoneIcon } from "./VehicleModalIcons";
import { User, Vehicle } from "@/types/types";
import Select from 'react-select';
import { useDispatch } from "@/lib/redux";
import { getFilteredUsers } from "@/lib/redux/slices/userSlice/userActions";
import { vehicleStatuses } from "@/app/constraints/roles&status";


/* interface FormValues {
  name: string;
  address: string;
  phoneNo: string;
  tpinNo: string;
  email: string;
  status: string;
} */

const VehicleForm: React.FC<FormikProps<Vehicle>> = ({ touched, errors, isSubmitting, handleSubmit, setFieldValue, values }) => {

  const dispatch = useDispatch()
  const [drivers, setDrivers] = useState<User[]>([])

  useEffect(() => {
    (
      async () => {
        const res = await getFilteredUsers('search[role]=1')
        if (!res?.error) {
          setDrivers(res.data)
        }
      }
    )()

  }, [dispatch]);


  const driverOptions = drivers?.map(driver => ({
    value: driver?.id,
    label: driver.firstName + " " + driver.firstName
  }))

  const readyOptions = [
    { value: false, label: "False" },
    { value: true, label: "True" },
  ]

  const statusOptions = Object.entries(vehicleStatuses).map(([key, value]) => ({
    value: parseInt(key),
    label: value
  }));
  
  return (
    <Form onSubmit={handleSubmit}>

      <div className="relative mb-3">
        <label htmlFor="DriverId" className="mb-1">Select the driver</label>
        <div className={`${touched.status && errors.status ? "has-error" : ""}`}>
          <Select name='DriverId'
            //@ts-ignore
            value={driverOptions.find(option => option.value === values.DriverId)}
            onChange={option => setFieldValue('DriverId', option ? Number(option.value) : '')}
            className='form-input' placeholder="Driver" options={driverOptions} />
        </div>
      </div>

      <div className="flex gap-x-2">
        <div className="relative mb-3 flex-1">
          <label htmlFor="name" className="mb-1">Ready</label>
          <div className={`${touched.isPublic && errors.isPublic ? "has-error" : ""}`}>
            <Select name='isPublic'
              value={readyOptions.find(option => option.value === values.isPublic)}
              onChange={option => setFieldValue('isPublic', option ? option.value : '')}
              className='form-input' options={readyOptions} />
          </div>
        </div>
        <div className="relative mb-3 flex-1">
          <label htmlFor="name" className="mb-1">Status</label>
          <div className={`${touched.status && errors.status ? "has-error" : ""}`} >
            <Select name='status'
              //@ts-ignore
              value={statusOptions.find(option => option.value === values.status)}
              onChange={option => setFieldValue('status', option ? Number(option.value) : '')}
              className='form-input' options={statusOptions} />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="plateNumber" className="mb-1">Plate number</label>
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

      <div className="flex gap-x-2">
        <div className="mb-3">
          <label htmlFor="model" className="mb-1">Model</label>
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
          <label htmlFor="capacity" className="mb-1">Capacity</label>
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

import React, { useEffect, useState } from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { PlaseNumber, Quantity, StatusIcon } from "./ProductionModalIcons";
import { Production } from "@/types/types";
import Select from 'react-select';
import { getAllVehicleAsync, selectVehicles, useDispatch, useSelector } from "@/lib/redux";
import makeAnimated from 'react-select/animated';



const ProductionForm: React.FC<FormikProps<Production>> = ({ touched, errors, isSubmitting, handleSubmit, setFieldValue, values }) => {

  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    dispatch(getAllVehicleAsync())
  }, [])


  const vehicles = useSelector(selectVehicles);

  const initialValueVehicles = vehicles.filter(vehicle => values?.VehicleIds.includes(vehicle.id));

  const [selectedVehicles, setSelectedVehicles] = useState(initialValueVehicles);

  const vehicleOp = vehicles.filter(v => v.status === 1 && v.isPublic).map(v => ({
    label: v.driver.firstName + " " + v.driver.lastName,
    value: v.id,
    driver: v.plateNumber,
    capacity: v.capacity,
  }));


  return (
    <Form onSubmit={handleSubmit}>
      <div className="relative mb-6">
        <StatusIcon />
        <div  >
          <Select placeholder="Select The Vehicle" options={vehicleOp} isMulti components={animatedComponents}
            value={vehicleOp.filter(option => values.VehicleIds.includes(option.value))}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
              setFieldValue('VehicleIds', selectedValues);
              const selectedVehicles = vehicles.filter(vehicle => selectedValues.includes(vehicle.id));
              setSelectedVehicles(selectedVehicles || null);
            }}
          />
          <ErrorMessage
            name="vehicleIds"
            component="div"
            className="text-red-500 text-sm mt-1 " />
        </div>
      </div>

      {
        selectedVehicles?.map((vehicle, i) => {
          return (
            <div key={vehicle.id} className="flex gap-2 my-4">
              <div className="panel grid place-content-center  py-1 px-2">{i + 1}</div>
              <div >
                <div className="relative">
                  <PlaseNumber />
                  <Field
                    type="text"
                    name="name"
                    placeholder="Plate Number"
                    className={`form-input ltr:pl-10 rtl:pr-10`}
                    value={vehicle ? `${vehicle?.plateNumber} ` : ''}
                  />
                </div>
              </div>
              <div >
                <div className="relative">
                  <Quantity />
                  <Field
                    type="text"
                    name="name"
                    placeholder="Capacity"
                    className={`form-input ltr:pl-10 rtl:pr-10`}
                    value={vehicle ? `${vehicle?.capacity} m³` : ''}
                  />
                </div>
              </div>
            </div>
          )
        })
      }
      <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

      {/* <div className="mb-3">
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
      </div> */}

      <button
        type="submit"
        className="btn btn-primary w-full mt-6"
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

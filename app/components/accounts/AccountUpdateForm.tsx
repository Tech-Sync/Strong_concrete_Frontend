import React, { useEffect } from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { Material } from "@/types/types";
import { ModalListIcon } from "@/app/icons/modal";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllFrimAsync, getAllMaterialAsync, selectFirms, selectMaterials } from "@/lib/redux";
interface Option {
  value: string | number; // Specify allowed value types (adjust as needed)
  label: string;
}
const AccountUpdateForm: React.FC<FormikProps<Material>> = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  values
}) => {

const dispatch = useDispatch()

useEffect(() => {
  //@ts-ignore
  dispatch(getAllFrimAsync());
  //@ts-ignore
  dispatch(getAllMaterialAsync());
}, [dispatch]);
const firms = useSelector(selectFirms);
const materials = useSelector(selectMaterials);


const firmOptions  = firms.filter(firm => firm.status === 2).map(firm => ({
    value: firm.id,
    label: firm.name
}))
const materialOptions = materials.map(material => ({
    value: material.id,
    label: material.name,
}))



  return (
    <Form onSubmit={handleSubmit}>
    
      <div className="mb-3">
        <div className="relative">
          <ModalListIcon />
          <Field
            name="firm"
            label="Select a Firm"
            as={Select} // Use Select component as the field wrapper
            options={firmOptions as Option[]}
            // Other Select component props (e.g., isClearable, styles)
          />
       
        </div>
              <ErrorMessage name="firm" component="div" className="error" />
          
      </div>
      <div className="mb-3">
        <div className="relative">
          <ModalListIcon />
          <Field
            name="material"
            label="Select a Material"
            as={Select} // Use Select component as the field wrapper
            options={materialOptions as Option[]}
            // Other Select component props (e.g., isClearable, styles)
          />
      
        </div>
              <ErrorMessage name="material" component="div" className="error" />
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

export default AccountUpdateForm;

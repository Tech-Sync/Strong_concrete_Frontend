import React, { useEffect } from "react";
import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { Material, PurchaseAccount } from "@/types/types";
import { ModalListIcon } from "@/app/icons/modal";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFrimAsync,
  getAllMaterialAsync,
  selectAccounts,
  selectFirms,
  selectMaterials,
} from "@/lib/redux";
interface Option {
  value: string | number; // Specify allowed value types (adjust as needed)
  label: string;
}
const AccountForm: React.FC<FormikProps<PurchaseAccount>> = ({
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  values,
  setFieldValue,
  handleChange 
}) => {
  const dispatch = useDispatch();


  useEffect(() => {
    //@ts-ignore
    dispatch(getAllFrimAsync());
    //@ts-ignore
    dispatch(getAllMaterialAsync());
  }, [dispatch]);
  const accounts = useSelector(selectAccounts);
  const firms = useSelector(selectFirms);
  const materials = useSelector(selectMaterials);



  // const firmOptions = firms
  //   .filter((firm) => firm.status === 2)
  //   .map((firm) => ({
  //     value: firm.id,
  //     label: firm.name,
  //   }));
  function uniqueByFirmId(list:PurchaseAccount[]) {
    const uniqueSet = new Set(); // Hızlı ve bellek dostu unique kontrol için bir Set kullanılır.
    const uniqueList = []; // Sonuç listesini saklamak için bir array oluşturulur.
  
    for (const obj of list) {
      const key = obj.FirmId; // Her objenin firmId değeri anahtar olarak kullanılır.
  
      // Eğer Set'te anahtar yoksa, objeye push edilir ve Set'e eklenir.
      if (!uniqueSet.has(key)) {
        uniqueList.push(obj);
        uniqueSet.add(key);
      }
    }
  
    return uniqueList; // Unique objeleri içeren array döndürülür.
  }
  const firmOptions =  uniqueByFirmId(accounts).map((firm) => ({
    value: firm.FirmId,
    label: firm.Firm.name,
  }));

  
  const [materialOptions, setMaterialOptions] = React.useState<Option[]>( []);
  const [debitOptions, setDebitOptions] = React.useState<Option[]>([]);
  const [debitAccounts, setDebitAccounts] = React.useState<PurchaseAccount[]>([]);
  const [selectedDebit, setSelectedDebit] = React.useState<number>(0);
  const [selectedCredit, setSelectedCredit] = React.useState<number>();




  return (
    <Form >
      <div className="mb-3">
        <label>Firm</label>
        <div className="relative">
          <Select
            name="firm"
            value={firmOptions.find((option) => option.value === values.FirmId)}
            onChange={(option) =>{


              setFieldValue("firm", option ? Number(option.value) : "")
     console.log(setFieldValue)
            setDebitAccounts(accounts.filter((item)=>item.FirmId===option?.value))
            //@ts-ignore
             setMaterialOptions(accounts.filter((item)=>item.FirmId===option.value).map((material) => ({value: material.id,label: material.Purchase.Material.name})))
            
                }
            }
            placeholder="Select a Firm"
            options={firmOptions}
            aria-label="Select a Firm"
            aria-describedby="firm"
            isDisabled={values.id !== 0}
          />
        </div>
        <ErrorMessage name="firm" component="div" className="error" />
      </div>
      <div className="mb-3">
        <label>Material</label>
        <div className="relative">
          <Select
            name="material"
            value={materialOptions?.find(
              (option) => option.value === values.Purchase?.id
            )}
            onChange={(option) =>{

              setFieldValue("MaterialId", option ? Number(option.value) : "")
              //@ts-ignore
          
              setDebitOptions(debitAccounts.filter((item)=>item.Purchase.id===option.value).map((debit) => ({value: debit.id,label: debit.debit})))
              
            }
             
           
            }
            placeholder="Select a Material"
            required
            options={materialOptions || []}
            isDisabled={values.Purchase?.id !== 0||!materialOptions.length}
          />
        </div>
        <ErrorMessage name="material" component="div" className="error" />
      </div>
      <div className="mb-3">
        <label>Debit</label>
        <div className="relative">
          <ModalListIcon />
            <Select
            name="debit"
            placeholder="Select a Debit"
            onChange={(option) =>{

              setSelectedDebit(option ? Number(option.label) : 0)
              console.log(option);
              
              
            }
          }
            options={debitOptions}
            isDisabled={values.id !== 0||!debitOptions.length}
          />
        </div>
        <ErrorMessage
          name="debit"
          component="div"
          className="text-red-500 text-sm mt-1 "
        />
      </div>
      <div className="mb-3">
        <label>Credit</label>
        <div className="relative">
          <ModalListIcon />
          <Field
            type="number"
            name="credit"
            placeholder="Credit"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched && errors ? "border-red-500" : ""
            }`}
            onChange={(e:any) => {
              console.log(e.target.value);
              
              setSelectedCredit(Number(e.target.value));
            }}
            value={selectedCredit}
          />
        </div>
        <ErrorMessage
          name="credit"
          component="div"
          className="text-red-500 text-sm mt-1 "
        />
      </div>
      <div className="mb-3">
        <label>Balance</label>
        <div className="relative">
          <ModalListIcon />
          <Field
            type="text"
            name="balance"
            placeholder="Balance"
            className={`form-input ltr:pl-10 rtl:pr-10${
              touched && errors ? "border-red-500" : ""
            }`}
            value={`K ${selectedDebit - (selectedCredit ?? 0)}`}
            disabled
          />
        </div>
        <ErrorMessage
          name="balance"
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

export default AccountForm;

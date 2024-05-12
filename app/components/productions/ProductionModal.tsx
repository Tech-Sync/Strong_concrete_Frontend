import { PlusIcon } from "@/app/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { object, string } from "yup";
import FirmForm from "./ProductionForm";
// import { addFirm, updateFirm } from "@/actions/firmActions";
import { coloredToast } from "@/lib/sweetAlerts";
import { useRouter } from "next/navigation";
import { getAllFrimAsync, selectproduction, selectproductionModal, setProductionModal, useDispatch, useSelector } from "@/lib/redux";
import { Firm } from "@/types/types";
import { addFirm, updateFirm } from "@/lib/redux/slices/firmSlice/firmActions";
import ProductionForm from "./ProductionForm";

const firmSchema = object({
  name: string().required("This field is required."),
  phoneNo: string().required("This field is required."),
  address: string().required("This field is required."),
  status: string().required("This field is required."),
  email: string()
    .email("Please enter a valid email address!")
    .required("Email is required!"),
});



export default function ProductionModal() {


  const ticketModal = useSelector(selectproductionModal);
  const params = useSelector(selectproduction);

  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    id: params?.id || "",
    name: params?.name || "",
    address: params?.address || "",
    phoneNo: params?.phoneNo || "",
    tpinNo: params?.tpinNo || "",
    email: params?.email || "",
    status: params?.status || "",
  }


  return (
    <div>
      <Transition appear show={ticketModal} as={Fragment}>
        <Dialog as="div" open={ticketModal} onClose={() => { dispatch(setProductionModal(false)) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div id="slideIn_down_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
            <div className="flex items-start justify-center min-h-screen px-4">
              <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__slideInDown">
                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                  <h5 className="font-bold text-lg">Modal Title</h5>
                  <button onClick={() => dispatch(setProductionModal(false))} type="button" className="text-white-dark hover:text-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={firmSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      if (params.id) {
                        //@ts-ignore
                        const res = await updateFirm(values);
                        if (res.message) {
                          coloredToast("success", res.message, "bottom-start");
                          dispatch(setProductionModal(false))
                          dispatch(getAllFrimAsync());
                        } else {
                          coloredToast("danger", res.error, "bottom-start");
                        }
                      } else {
                        const { id, ...data } = values
                        const res = await addFirm(data);
                        setTimeout(() => {
                          setSubmitting(false);
                          if (res.message) {
                            coloredToast("success", res.message, "bottom-start");
                            dispatch(setProductionModal(false))
                            dispatch(getAllFrimAsync());
                          } else {
                            coloredToast("danger", res.error, "bottom-start");
                          }
                        }, 500);
                      }
                    }}
                    //@ts-ignore
                    component={(props) => <ProductionForm {...props} />}
                  ></Formik>

                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}




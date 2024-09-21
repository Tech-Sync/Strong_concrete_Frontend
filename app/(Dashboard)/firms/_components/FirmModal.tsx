'use client'
import { PlusIcon } from "@/app/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { object, string } from "yup";
import FirmForm from "./FirmForm";
// import { addFirm, updateFirm } from "@/actions/firmActions";
import { coloredToast } from "@/utils/sweetAlerts";
import { useRouter } from "next/navigation";
import { Firm } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllFirmAsync, selectFirm, selectFirmModal, setFirmModal } from "@/lib/features/firm/firmSlice";
import { addFirm } from "@/lib/features/firm/firmActions";

const firmSchema = object({
  name: string().required("This field is required."),
  phoneNo: string().required("This field is required."),
  address: string().required("This field is required."),
  status: string().required("This field is required."),
  email: string()
    .email("Please enter a valid email address!")
    .required("Email is required!"),
});



export default function FirmModal() {


  const ticketModal = useAppSelector(selectFirmModal);
  const params = useAppSelector(selectFirm);

  const dispatch = useAppDispatch();
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
        <Dialog as="div" open={ticketModal} onClose={() => { dispatch(setFirmModal(false)) }}>
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
          <div
            id="firm_modal"
            className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60"
          >
            <div className="flex min-h-screen items-start justify-center  px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                  <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white ">
                    <h5>{params.id ? "Update The Firm" : "Add New Firm"}</h5>
                    <button
                      type="button"
                      onClick={() => dispatch(setFirmModal(false))}
                      className="text-white-dark hover:text-dark"
                    >
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
                            dispatch(setFirmModal(false))
                            dispatch(getAllFirmAsync({}));
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
                              dispatch(setFirmModal(false))
                              dispatch(getAllFirmAsync({}));
                            } else {
                              coloredToast("danger", res.error, "bottom-start");
                            }
                          }, 500);
                        }
                      }}
                      //@ts-ignore
                      component={(props) => <FirmForm {...props} />}
                    ></Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

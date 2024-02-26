import { PlusIcon } from "@/app/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import React, { Fragment } from "react";
import { object, string } from "yup";
import MaterialForm from "./AccountForm";
import { coloredToast } from "@/lib/sweetAlerts";
import { useRouter } from "next/navigation";
import { getAllMaterialAsync, useDispatch } from "@/lib/redux";
import {  PurchaseAccount } from "@/types/types";
import { addMaterial, updateMaterial } from "@/lib/redux/slices/materialSlice/materialActions";
import { ModalCloseIcon } from "@/app/icons/modal";

const accountsSchema = object({
  name: string().required("Material name is required!"),
  unitType: string().required("Unit type field is required."),
});

interface accountsModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
  accountsInitials: PurchaseAccount;
  setMaterialInitials: (value: object) => void;
}

export default function AccountModal({ modal, setModal, accountsInitials, setMaterialInitials, }: accountsModalProps) {

  const emptyMaterial = { name: "", unitType: "" };
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          setModal(true), setMaterialInitials(emptyMaterial);
        }}
        className="btn btn-primary gap-2"
      >
        <PlusIcon />
        Credit
      </button>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" open={modal} onClose={() => { setModal(false); }}
        >
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
            id="material_modal"
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
                    <h5>Add New Material</h5>
                    <button
                      type="button"
                      onClick={() => setModal(false)}
                      className="text-white-dark hover:text-dark"
                    >
                      <ModalCloseIcon />
                    </button>
                  </div>
                  <div className="p-5">
                    <Formik
                      initialValues={accountsInitials.id ? accountsInitials : emptyMaterial}
                      validationSchema={accountsSchema}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if ("id" in accountsInitials) {
                          const res = await updateMaterial(values);

                          if (res.message) {
                            coloredToast("success", res.message, "bottom-start");
                            setModal(false);
                            dispatch(getAllMaterialAsync());
                          } else {
                            coloredToast("danger", res.error, "bottom-start");
                          }
                        } else {
                          const res = await addMaterial(values);

                          setTimeout(() => {
                            setSubmitting(false);
                            if (res.message) {
                              coloredToast("success", res.message, "bottom-start");
                              setModal(false);
                              dispatch(getAllMaterialAsync());
                            } else {
                              coloredToast("danger", res.error, "bottom-start");
                            }
                          }, 500);
                        }
                      }}
                      //@ts-ignore
                      component={(props) => <MaterialForm {...props} />}
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

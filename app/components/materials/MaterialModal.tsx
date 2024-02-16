import { PlusIcon } from "@/app/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { object, string } from "yup";
import MaterialForm from "./MaterialForm";
import { coloredToast } from "@/lib/sweetAlerts";
import { useRouter } from "next/navigation";
import {  getAllMaterialAsync, useDispatch } from "@/lib/redux";
import { Material } from "@/types/types";
import { addMaterial, updateMaterial } from "@/lib/redux/slices/materialSlice/materialActions";
import { ModalCloseIcon } from "@/app/icons/modal";

const materialSchema = object({
  name: string().required("Material name is required!"),
  unitType: string().required("Unit type field is required."),
});

interface materialModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
  materialInitials: Material;
  setMaterialInitials: (value: object) => void;
}

export default function MaterialModal({
  modal,
  setModal,
  materialInitials,
  setMaterialInitials,
}: materialModalProps) {
  const emptyMaterial = {
    name: "",
    unitType: "",
  };
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
        Add New
      </button>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          open={modal}
          onClose={() => {
            setModal(false);
          }}
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
                      initialValues={materialInitials.id ? materialInitials : emptyMaterial}
                      validationSchema={materialSchema}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        if ("id" in materialInitials) {
                          console.log('values from form',values?.quantity.toFixed(2));
                          //@ts-ignore
                          const res = await updateMaterial(values);
                          if (res.message) {
                            coloredToast(
                              "success",
                              res.message,
                              "bottom-start"
                            );
                            setModal(false);
                            dispatch(getAllMaterialAsync());
                          } else {
                            coloredToast("danger", res.error, "bottom-start");
                          }
                        } else {
                          console.log(values);
                          const res = await addMaterial(values);
                          
                          setTimeout(() => {
                            setSubmitting(false);
                            if (res.message) {
                              coloredToast(
                                "success",
                                res.message,
                                "bottom-start"
                              );
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

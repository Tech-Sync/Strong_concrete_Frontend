import { PlusIcon } from "@/app/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { object, string } from "yup";
import { coloredToast } from "@/lib/sweetAlerts";
import { useRouter } from "next/navigation";
import { getAllFrimAsync, useDispatch } from "@/lib/redux";
import { Firm } from "@/types/types";
import { addFirm, updateFirm } from "@/lib/redux/slices/firmSlice/firmActions";
import VehicleForm from "./VehicleForm";
import { ModalCloseIcon } from "@/app/icons/modal";

const firmSchema = object({
  name: string().required("This field is required."),
  phoneNo: string().required("This field is required."),
  address: string().required("This field is required."),
  status: string().required("This field is required."),
  email: string()
    .email("Please enter a valid email address!")
    .required("Email is required!"),
});

interface firmModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
  vehicleInitials: Firm;
  setVehicleInitials: (value: object) => void;
}

export default function VehicleModal({ modal, setModal, vehicleInitials, setVehicleInitials, }: firmModalProps) {

  const emptyVehicle = {
    DriverId: '',
    plateNumber: "",
    model: '',
    capacity: '',
    status: ''
  };
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => { setModal(true), setVehicleInitials(emptyVehicle); }}
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
                <Dialog.Panel className="panel my-32 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                  <div className="flex items-center justify-between p-4 text-lg font-semibold dark:text-white ">
                    <h5>{vehicleInitials.id ? "Update The Vehicle" : "Add New Vehicle"}</h5>
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
                      initialValues={vehicleInitials.id ? vehicleInitials : emptyVehicle}
                      validationSchema={firmSchema}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if ("id" in vehicleInitials) {
                          //@ts-ignore
                          console.log('update');
                       /*    const res = await updateFirm(values);
                          if (res.message) {
                            coloredToast("success", res.message, "bottom-start");
                            setModal(false);
                            dispatch(getAllFrimAsync());
                          } else {
                            coloredToast("danger", res.error, "bottom-start");
                          } */
                        } else {
                          const res = await addFirm(values);
                          setTimeout(() => {
                            setSubmitting(false);
                            if (res.message) {
                              coloredToast(
                                "success",
                                res.message,
                                "bottom-start"
                              );
                              setModal(false);
                              dispatch(getAllFrimAsync());
                            } else {
                              coloredToast("danger", res.error, "bottom-start");
                            }
                          }, 500);
                        }
                      }}
                      //@ts-ignore
                      component={(props) => <VehicleForm {...props} />}
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

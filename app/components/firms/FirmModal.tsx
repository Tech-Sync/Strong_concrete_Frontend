import { PlusIcon } from "@/app/icons";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { object, string } from "yup";
import FirmForm from "./FirmForm";
import { addFirm } from "@/actions/firmActions";
import { coloredToast } from "@/lib/sweetAlerts";
import { useRouter } from "next/navigation";

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
  const [modal, setModal] = useState(false);
  const router = useRouter()
  return (
    <div>
      <button onClick={() => setModal(true)} className="btn btn-primary gap-2">
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
                <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                  <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white ">
                    <h5>Add New Firm</h5>
                    <button
                      type="button"
                      onClick={() => setModal(false)}
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
                      initialValues={{
                        name: "",
                        address: "",
                        phoneNo: "",
                        tpinNo: "",
                        email: "",
                        status: "",
                      }}
                      validationSchema={firmSchema}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        const firms = await addFirm(values);
                        setTimeout(() => {
                          setSubmitting(false);

                          if (firms.message) {
                            coloredToast("success", firms.message, 'bottom-start');
                            setModal(false);
                          } else {
                            coloredToast("danger", firms.error, 'bottom-start');
                          }
                        }, 500);
                      }}
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

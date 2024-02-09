import { ModalCloseIcon, ModalListIcon } from '@/app/icons/modal';
import React, { useState ,Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { object, string } from "yup";
import { PurchasePlusIcon } from '@/app/icons/purchasesIcon/PurchasePlusIcon';
import { ErrorMessage, Field, Form, Formik } from 'formik';
const addPurchaseSchema = object({
    name: string()
      .required("Material name is required!"),
    unittype: string()
      .required("Unit type field is required.")
     
  });
  

const PurchaseAddNewModal = () => {
    const [modal, setModal] = useState(false)
    return (
        <>
          <button onClick={() => setModal(true)} className="btn btn-primary gap-2">
            <PurchasePlusIcon />
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
                <div className="flex min-h-screen items-start justify-center px-4">
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
                      <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
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
                          initialValues={{ name: "", unittype: "" }}
                          validationSchema={addPurchaseSchema}
                          onSubmit={(values, { setSubmitting, resetForm }) => {
                            console.log(values);
                            // setTimeout(() => {
                            //   // login(values)
                            //     .then((data) => {
                            //       if (data?.error) {
                            //         setSubmitting(false);
                            //         resetForm();
                            //         coloredToast("danger", data.error.trim());
                            //       } else {
                            //         router.push("/");
                            //         successToast("Signed in successfully.");
                            //         setSubmitting(false);
                            //       }
                            //     })
                            //     .catch((error) => {
                            //       setSubmitting(false);
                            //       resetForm();
                            //       coloredToast("danger", "Something went wrong.");
                            //     });
                            // }, 400);
                          }}
                        >
                          {({ touched, errors, isSubmitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                              <div className="relative mb-4">
                                <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                  <ModalListIcon />
                                </span>
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  placeholder="Material name"
                                  className={`form-input ${
                                    touched.name && errors.name
                                      ? "border-red-500"
                                      : ""
                                  } placeholder:text-gray-400 ltr:pl-10 rtl:pr-10`}
                                />
                              </div>
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-red-500 text-sm "
                                />
                              <div className="relative mb-4">
                                <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                  <ModalListIcon />
                                </span>
                                <Field
                                  type="text"
                                  name="unittype"
                                  id="unittype"
                                  placeholder="Unit type"
                                  className={`form-input ${
                                    touched.unittype && errors.unittype
                                      ? "border-red-500"
                                      : ""
                                  } placeholder:text-gray-400 ltr:pl-10 rtl:pr-10`}
                                />
                            
                              </div>
                                <ErrorMessage
                                  name="unittype"
                                  component="div"
                                  className="text-red-500 text-sm "
                                />
                              <button
                                 type="submit"
                                className="btn btn-primary w-full"
                                disabled={isSubmitting}
                                >
                                  {isSubmitting && (
                                    <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle mr-4"></span>
                                  )}
                                  {isSubmitting ? "LOADING.." : "Submit"}
                              </button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      );
}

export default PurchaseAddNewModal

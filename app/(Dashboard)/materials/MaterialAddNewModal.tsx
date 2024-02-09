import { MaterialPlusIcon, ModalCloseIcon, ModalListIcon } from '@/app/icons';
import React, { useState ,Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { object, string } from "yup";
const addMaterialSchema = object({
    name: string()
      .required("Material name is required!"),
    unittype: string()
      .required("Unit type field is required.")
     
  });
  

const MaterialAddNewModal = () => {
    const [modal, setModal] = useState(false)
  return (
    <>
     <button onClick={() => setModal(true)}  className="btn btn-primary gap-2">
                           <MaterialPlusIcon />
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
                                        <div id="material_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
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
                                                            <button type="button" onClick={() => setModal(false)} className="text-white-dark hover:text-dark">
                                                               <ModalCloseIcon />
                                                            </button>
                                                        </div>
                                                        <div className="p-5">
                                                            <form>
                                                                <div className="relative mb-4">
                                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                        <ModalListIcon />
                                                                    </span>
                                                                    <input type="text" placeholder="Material name" className="form-input ltr:pl-10 rtl:pr-10" id="name" />
                                                                </div>
                                                                <div className="relative mb-4">
                                                                    <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                                                        <ModalListIcon />
                                                                    </span>
                                                                    <input type="text" placeholder="Unit type" className="form-input ltr:pl-10 rtl:pr-10" id="unitType" />
                                                                </div>
                                                                <button type="button" className="btn btn-primary w-full">
                                                                    Submit
                                                                </button>
                                                            </form>
                                                        </div>
                                                       
                                                     
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                    </Transition> 
    </>
  )
}

export default MaterialAddNewModal

'use client'
import { ModalCloseIcon } from '@/app/icons';
import { Transaction } from '@/types/types';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

export default function PurchaseAccPayModal({ saleInfo }: { saleInfo: Transaction }) {
    const [modal11, setModal11] = useState(false);

    return (
        <div>
            <button type="button" onClick={() => setModal11(true)} className="btn btn-success">
                Pay Now
            </button>
            <Transition appear show={modal11} as={Fragment}>
                <Dialog as="div" open={modal11} onClose={() => setModal11(false)}>
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
                    <div id="fadein_left_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__fadeInUp">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Pay for  {saleInfo.Firm.name}</h5>
                                    <button onClick={() => setModal11(false)} type="button" className="text-white-dark hover:text-dark">
                                        <ModalCloseIcon />
                                    </button>
                                </div>
                                <div className="p-5">
                                    
                             ............
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => setModal11(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button onClick={() => setModal11(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

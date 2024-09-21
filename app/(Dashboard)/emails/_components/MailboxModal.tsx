'use client'
import React, { FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { Email } from '@/types/types';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import { selectKycs } from '@/lib/features/kyc/kycSlice';
// import { selectCategories } from '@/lib/features/category/categorySlice';
// import { createTicket } from '@/lib/features/tickets/ticketAPI';
import { coloredToast } from '@/utils/sweetAlerts';
import { selectAsssignModal, setAssignModal, setStar } from '@/lib/features/email/emailSlice';


interface MailboxModalProps {
    ticketMailInfo: Email | null;
    // setStar: (mail: Email | null, assignIt?: boolean) => Promise<void>;
}

const MailboxModal = ({ ticketMailInfo }: MailboxModalProps) => {

    const dispatch = useAppDispatch();
    // const agents = useAppSelector(selectKycs);
    // const categories = useAppSelector(selectCategories);
    const assignModal = useAppSelector(selectAsssignModal);
    const [selectedAgent, setSelectedAgent] = useState<number | undefined>(undefined);

    // const agentOp = agents.map((kyc) => ({ label: kyc.first_name + " " + kyc.last_name, value: kyc.id }));
    // const categoryOp = categories.map((category) => ({ label: category.title, value: category.id }));
    // console.log(ticketMailInfo);

    // const handleTicket = async (e: FormEvent<HTMLFormElement>) => {

    //     e.preventDefault();

    //     const initialValues: {
    //         title: string | undefined;
    //         description: string | undefined;
    //         status: string;
    //         caller_email: string | undefined;
    //         email_id: string | undefined;
    //         priority: string;
    //         flag: string;
    //         cat: number;
    //         assigned_agent: number | undefined;
    //     } = {
    //         title: ticketMailInfo?.subject,
    //         email_id: ticketMailInfo?.id,
    //         description: ticketMailInfo?.body?.content,
    //         status: "Active",
    //         caller_email: ticketMailInfo?.sender?.emailAddress?.address,
    //         priority: "Medium",
    //         flag: "Moderate",
    //         cat: 5,
    //         assigned_agent: selectedAgent,
    //     }
    //     const res = await createTicket(initialValues);
    //     if (res.message) {
    //         dispatch(setStar({ mail: ticketMailInfo, assignIt: true }))
    //         // setStar(ticketMailInfo, true)
    //         dispatch(setAssignModal(false))
    //         coloredToast("success", res.message, "bottom-start");

    //     } else coloredToast("danger", res.error, "bottom-start");
    // }


    return (
        <Transition appear show={assignModal} as={Fragment}>
            <Dialog as="div" open={assignModal} onClose={() => dispatch(setAssignModal(false))}>
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
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__slideInDown">
                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                <h5 className="font-bold text-lg">Modal Title</h5>
                                <button onClick={() => dispatch(setAssignModal(false))} type="button" className="text-white-dark hover:text-dark">
                                    X
                                </button>
                            </div>
                            {/* <form className="p-5" onSubmit={handleTicket}>
                                <div className="mb-5">
                                    <label htmlFor="phoneNo">Choose the Agent </label>
                                    <div className="flex justify-center items-center gap-2">
                                        <Select placeholder="Select The Number" options={agentOp}
                                            onChange={option => { setSelectedAgent(option?.value) }}
                                            className='flex-1' required />
                                    </div>
                                </div>
                                <div className="flex justify-end items-center mt-8">
                                    <button onClick={() => dispatch(setAssignModal(false))} type="button" className="btn btn-outline-danger">
                                        Discard
                                    </button>
                                    <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                        Create Ticket
                                    </button>
                                </div>
                            </form> */}
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default MailboxModal


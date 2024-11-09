'use client'
import { ModalCloseIcon } from '@/app/icons';
import { getAllPurchaseAccAccs, updatePurchaseAcc } from '@/lib/features/purchaseAccount/purchaseAccActions';
import { PurchaseAccountList, Transaction } from '@/types/types';
import { formatDate } from '@/utils/helperFunctions';
import { coloredToast } from '@/utils/sweetAlerts';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';

export default function PurchaseAccPayModal({ purchaseAccInfo, updatePurchaseList }: { purchaseAccInfo: Transaction, updatePurchaseList: (value: any) => void }) {
    const [modal11, setModal11] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const amount = (e.currentTarget.credit as HTMLInputElement).value;
        const res = await updatePurchaseAcc({ id: purchaseAccInfo.id, credit: amount });

        if (res.error) {
            coloredToast('danger', res.error);
        } else {
            coloredToast('success', res?.message || 'Operation successful');

            updatePurchaseList((prev: PurchaseAccountList[]) => {
                return prev.map((item: PurchaseAccountList) => {
                    const transactionIndex = item.transactions.findIndex(transaction => transaction.id === res.data.data.id);
                    if (transactionIndex !== -1) {
                        const updatedTransactions = [...item.transactions];
                        updatedTransactions[transactionIndex] = { ...updatedTransactions[transactionIndex], ...res.data.data };

                        const totalCredit = updatedTransactions.reduce((sum, transaction) => sum + transaction.credit, 0);
                        const totalDebit = updatedTransactions.reduce((sum, transaction) => sum + transaction.debit, 0);

                        return { ...item, transactions: updatedTransactions, totalCredit, totalDebit };
                    }
                    return item;
                });
            });



            setModal11(false);
        }
    }

    return (
        <>
            {/* <button type="button" onClick={() => setModal11(true)} className="btn btn-success">
                Pay Now
            </button> */}
            <button
                onClick={() => setModal11(true)}
                type="button"
                className="badge badge-outline-primary absolute bg-primary-light text-xs opacity-0 group-hover:opacity-100 ltr:right-40  dark:bg-black">
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
                                    <h5 className="font-bold text-lg">Pay for  {purchaseAccInfo.Firm.name}</h5>
                                    <button onClick={() => setModal11(false)} type="button" className="text-white-dark hover:text-dark">
                                        <ModalCloseIcon />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className='flex gap-6 mb-5'>
                                        <p>
                                            <span className="font-bold">Balance:</span> K{purchaseAccInfo.balance}
                                        </p>
                                        <p>
                                            <span className="font-bold">Material:</span> {purchaseAccInfo.Purchase.Material.name}
                                        </p>
                                        <p>
                                            <span className="font-bold">Date:</span> {formatDate(purchaseAccInfo.createdAt)}
                                        </p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="credit">Amount</label>
                                        <input className='form-input' type="number" name="credit" id="credit" placeholder='K' required />
                                        <div className="flex justify-end items-center mt-8">
                                            <button onClick={() => setModal11(false)} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

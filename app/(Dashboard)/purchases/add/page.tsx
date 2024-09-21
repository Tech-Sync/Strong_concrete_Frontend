/* eslint-disable @next/next/no-img-element */
import AddForm from '@/app/(Dashboard)/purchases/_components/AddForm';
import { DownloadIcon, PreviewIcon, SendInvoiceIcon } from '@/app/icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: "Purchase Create", description: "Purchase Create"};


const AddPage = async () => {

    return (
        <div className="flex flex-col gap-2.5 xl:flex-row">
            <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div className="flex flex-wrap justify-between px-4">
                    <div className="mb-6 w-full lg:w-1/2">
                        <div className="flex shrink-0 items-center text-black dark:text-white">
                            <img src="/assets/images/logo.png" alt="img" className="w-14" />
                        </div>
                        <div className="mt-6 space-y-1 text-gray-500 dark:text-gray-400">
                            <div>Mungwi, Lusaka west Mungwi road Lusaka ZM, 10101</div>
                            <div>strong-concrete@gmail.com</div>
                            <div>+260 (97) 123-4567</div>
                        </div>
                    </div>
                </div>
                <hr className="my-3 border-white-light dark:border-[#1b2e4b]" />

                <div className=" p-5">
                    <AddForm />
                </div>

            </div>
            <div className="mt-6 w-full xl:mt-0 xl:w-96">
                <div className="panel">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
                        <button type="button" className="btn btn-info w-full gap-2">
                            <SendInvoiceIcon />
                            Send Invoice
                        </button>

                        <Link href="/purchases/preview" className="btn btn-primary w-full gap-2">
                            <PreviewIcon />
                            Preview
                        </Link>

                        <button type="button" className="btn btn-secondary w-full gap-2">
                            <DownloadIcon />
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPage;

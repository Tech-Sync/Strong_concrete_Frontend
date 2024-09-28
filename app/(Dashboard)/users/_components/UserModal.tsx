import React, { useRef, useState } from 'react'
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { coloredToast } from '@/utils/sweetAlerts';
import Image from 'next/image';
import { useAppDispatch } from '@/lib/hooks';
import { createUser, updateUser } from '@/lib/features/user/userActions';
import { getAllUserAsync } from '@/lib/features/user/userSlice';

interface UserModalProps {
    userModal: boolean;
    setUserModal: (value: boolean) => void;
    params: any;
    changeValue: (e: any) => void;
}

const UserModal = ({ userModal, setUserModal, params, changeValue }: UserModalProps) => {
    const dispatch = useAppDispatch();


    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [profilePic, setProfilePic] = useState<any | null>(null);

    const handleUpload = () => {
        const fileInput = document.querySelector('.custom-file-container__custom-file__custom-file-input') as HTMLInputElement;
        const file = fileInput.files![0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (params.id) {
            const formData = new FormData();

            const { id, password, createdAt, updatedAt, isVerified, emailToken, deletedAt, ...updateFields } = params;

            Object.keys(updateFields).forEach(key => formData.append(key, updateFields[key]));

            const res = await updateUser(params.id, formData);
            if (res.message) {
                coloredToast("success", res.message, "bottom-start");
                dispatch(getAllUserAsync({}));
            } else {
                coloredToast("danger", res.error, "bottom-start");
            }

        } else {
            const formData = new FormData();
            Object.keys(params).forEach(key => formData.append(key, params[key]));
            if (profilePic) formData.append('profilePic', profilePic);

            const res = await createUser(formData);
            if (res.message) {
                coloredToast("success", res.message, "bottom-start");
                dispatch(getAllUserAsync({}));
            } else {
                coloredToast("danger", res.error, "bottom-start");
            }
        }
        setPreview(null)
        setUserModal(false);
        setProfilePic(null);
    };

    return (
        <Transition appear show={userModal} as={Fragment}>
            <Dialog as="div" open={userModal} onClose={() => setUserModal(false)} className="relative z-50">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={() => setUserModal(false)}
                                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
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
                                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                                    {params.id ? 'Edit User' : 'Add User'}
                                </div>
                                <div className="p-5">
                                    <form onSubmit={saveUser}>
                                        <div className=''>
                                            <input
                                                id='profilePic'
                                                type="file"
                                                className="custom-file-container__custom-file__custom-file-input h-0 w-full"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={handleUpload}
                                                style={{ display: 'none' }}
                                            />
                                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                            <div className="upload__image-wrapper">
                                                {
                                                    !profilePic && (
                                                        <div
                                                            className="custom-file-container__custom-file__custom-file-control cursor-pointer static mb-5 h-9"
                                                            onClick={handleDivClick}
                                                        >
                                                            Choose Profile Pic...
                                                        </div>
                                                    )
                                                }
                                                {preview && (
                                                    <div className="custom-file-container__image-preview relative mb-5 ">
                                                        <div className='absolute left-0 text-2xl cursor-pointer' onClick={() => { setProfilePic(null); setPreview(null) }}>x </div>
                                                        <Image
                                                            width={45}
                                                            height={45}
                                                            src={preview}
                                                            alt="img"
                                                            className="m-auto max-w-md h-24 w-24 rounded-full object-cover"
                                                        />

                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mb-5">
                                            <div className="">
                                                <label htmlFor="firstName">First Name</label>
                                                <input id="firstName" type="text" placeholder="Enter First Name" className="form-input" value={params.firstName} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div >
                                                <label htmlFor="lastName">Last Name</label>
                                                <input id="lastName" type="text" placeholder="Enter Last Name" className="form-input" value={params.lastName} onChange={(e) => changeValue(e)} />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mb-5">

                                            <div className="">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="flex-1">
                                                <label htmlFor="role">Role</label>
                                                <select id="role" className="form-select" value={params.role} onChange={(e) => changeValue(e)}>
                                                    <option value="0">Select Role</option>
                                                    <option value="1">Driver</option>
                                                    <option value="2">Producer</option>
                                                    <option value="3">Accountant</option>
                                                    <option value="4">Saler</option>
                                                    <option value="5">Admin</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mb-5">
                                            <div className="">
                                                <label htmlFor="phoneNO">Phone Number</label>
                                                <input id="phoneNo" type="text" placeholder="Enter Phone Number" className="form-input" value={params.phoneNo} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="">
                                                <label htmlFor="nrcNo">Nrc Number</label>
                                                <input id="nrcNo" type="text" placeholder="Enter Nrc No" className="form-input" value={params.nrcNo} onChange={(e) => changeValue(e)} />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mb-5">
                                            <div className='flex-1'>
                                                <label htmlFor="isActive">Active</label>
                                                <select id="isActive" className="form-select" value={params.isActive} onChange={(e) => changeValue(e)}>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </div>
                                            {
                                                params.id && <div className='flex-1'>
                                                    <label htmlFor="isVerified">Verified</label>
                                                    <select disabled id="isVerified" className="form-select" value={params.isVerified} onChange={(e) => changeValue(e)} >
                                                        <option value="true">True</option>
                                                        <option value="false">False</option>
                                                    </select>
                                                </div>
                                            }
                                        </div>
                                        {
                                            !params.id &&
                                            <div className="mb-5">
                                                <label htmlFor="password">Default Password Used</label>
                                                <input readOnly id="password" type="password" placeholder="Enter Password" className="form-input" value={params.password} onChange={(e) => changeValue(e)} />
                                            </div>
                                        }
                                        <div className="mb-5">
                                            <label htmlFor="address">Address</label>
                                            <textarea
                                                id="address"
                                                rows={3}
                                                placeholder="Enter Address"
                                                className="form-textarea min-h-[130px] resize-none"
                                                value={params.address}
                                                onChange={(e) => changeValue(e)}
                                            ></textarea>
                                        </div>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setUserModal(false)}>
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                {params.id ? 'Update' : 'Add'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default UserModal
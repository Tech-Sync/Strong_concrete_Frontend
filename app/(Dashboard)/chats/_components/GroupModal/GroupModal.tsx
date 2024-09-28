'use client'
import { StatusIcon } from '@/app/(Dashboard)/firms/_components/FirmModalIcons';
import { ModalCloseIcon } from '@/app/icons';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { useState, Fragment, useRef } from 'react';
import { selectUsers } from '@/lib/features/user/userSlice';
import { useAppSelector } from '@/lib/hooks';
import { useCurrentUser } from '@/hooks/useCurrentUser';


interface GroupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface GroupData {
    chatName: string;
    userIds: string[];
    chatPicture: string;
    id?: string;
}

export default function GroupModal({ onClose, isOpen }: GroupModalProps) {

    const animatedComponents = makeAnimated();


    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [profilePic, setProfilePic] = useState<any | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<any>([])
    const { userInfo } = useCurrentUser();

    const users = useAppSelector(selectUsers);

    const userOp = users
        .filter(user => user.id !== userInfo?.id)
        .map(user => ({
            label: user.firstName + " " + user.lastName,
            value: user.id,
        }));

    console.log(userOp);

    const [groupData, setGroupData] = useState<GroupData>({
        chatName: "",
        userIds: [],
        chatPicture: ""
    })

    const handleUpload = () => {
        const fileInput = document.querySelector('.custom-file-container__custom-file__custom-file-input') as HTMLInputElement;
        const file = fileInput.files![0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setGroupData({ ...groupData, [id]: value });
    };

    async function handleCreateGroup() {

    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={() => onClose()}>
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
                        <Dialog.Panel
                            className='panel border-0 p-0 rounded-lg  w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated'
                        >
                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                <h5 className="font-bold text-lg">Create New Group</h5>
                                <button onClick={() => onClose()} type="button" className="text-white-dark hover:text-dark">
                                    <ModalCloseIcon />
                                </button>
                            </div>
                            <div className="p-5">
                                <form onSubmit={handleCreateGroup}>
                                    {/* picture upload */}
                                    <div>
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
                                            {!profilePic && (
                                                <div
                                                    className="custom-file-container__custom-file__custom-file-control cursor-pointer static mb-5 h-9"
                                                    onClick={handleDivClick}
                                                >
                                                    Choose Profile Pic...
                                                </div>
                                            )}
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

                                    <div className="mb-5">
                                        <label htmlFor="chatName">Group Name</label>
                                        <input id="chatName" type="text" placeholder="Enter First Name" className="form-input" value={groupData.chatName} onChange={(e) => changeValue(e)} />
                                    </div>

                                    <div className="relative mb-6">
                                        <StatusIcon />
                                        <div  >
                                            <Select placeholder="Select Group Members" options={userOp} isMulti components={animatedComponents}

                                            // onChange={(selectedOptions) => {
                                            //     const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                            //     setSelectedUsers(users.filter(user => selectedValues.includes(user.id)))

                                            // }}
                                            />
                                        </div>
                                    </div>

                                    {
                                        selectedUsers?.map((user: any, i: number) => {
                                            return (
                                                <div key={user.id} className="flex gap-2 my-4">
                                                    <div className="panel grid place-content-center  py-1 px-2">{i + 1}</div>
                                                    <div className="flex gap-2">
                                                        <img src="" alt="" />
                                                        <p>adi</p>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                    <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

                                    <div className="mt-8 flex items-center justify-end">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => onClose()}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            {groupData?.id ? 'Update' : 'Add'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog >
        </Transition >
    )
}
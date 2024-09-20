'use client'
import { SaveIcon } from '@/app/icons';
import { getAllFirmAsync, selectFirms } from '@/lib/features/firm/firmSlice';
import { getAllMaterialAsync, selectMaterials } from '@/lib/features/material/materialSlice';
import { addPurchase, updatePurchase } from '@/lib/features/purchase/purchaseActions';
import { selectPurchase, updatePurchaseState } from '@/lib/features/purchase/purchaseSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { coloredToast } from '@/lib/sweetAlerts';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, } from 'react'
import Select from 'react-select';


const AddForm = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const purchase = useAppSelector(selectPurchase);


    useEffect(() => {
        dispatch(getAllFirmAsync({}));
        dispatch(getAllMaterialAsync({}));
    }, [dispatch]);

    const firms = useAppSelector(selectFirms);
    const materials = useAppSelector(selectMaterials);


    const firmOptions = firms?.filter(firm => firm.status === 2)?.map(firm => ({
        value: firm.id,
        label: firm.name
    }))
    const materialOptions = materials?.map(material => ({
        value: material.id,
        label: material.name,
    }))

    const initialValues = {
        MaterialId: purchase?.MaterialId || '',
        FirmId: purchase?.FirmId || '',
        quantity: purchase?.quantity || '',
        unitPrice: purchase?.unitPrice || '',
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting, resetForm }) => {

                if (purchase) {
                    const res = await updatePurchase({ ...values, id: purchase.id })
                    setTimeout(() => {
                        setSubmitting(false);
                        if (res.message) {
                            resetForm();
                            router.replace('/purchases')
                            coloredToast("success", res.message, "bottom-start");
                            dispatch(getAllFirmAsync({}));
                            dispatch(updatePurchaseState(null))
                        } else {
                            coloredToast("danger", res.error, "bottom-start");
                        }
                    }, 500);
                } else {
                    const res = await addPurchase(values);
                    setTimeout(() => {
                        setSubmitting(false);
                        if (res.message) {
                            coloredToast("success", res.message, "bottom-start");
                            dispatch(getAllFirmAsync({}));
                            resetForm();
                            router.replace('/purchases')
                        } else {
                            coloredToast("danger", res.error, "bottom-start");
                        }
                    }, 500);
                }

            }}
        >
            {
                ({ isSubmitting, values, setFieldValue, handleChange, handleSubmit }) => (
                    <Form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firm">Firm</label>
                                <Select name='FirmId'
                                    value={firmOptions.find(option => option.value === values.FirmId)}
                                    onChange={option => setFieldValue('FirmId', option ? Number(option.value) : '')}
                                    className='form-input' placeholder="Select a Firm" options={firmOptions} />
                            </div>
                            <div>
                                <label htmlFor="material">Material</label>
                                <Select name='MaterialId'
                                    value={materialOptions.find(option => option.value === values.MaterialId)}
                                    onChange={option => setFieldValue('MaterialId', option ? Number(option.value) : '')}
                                    placeholder="Select a Material" className='form-input'
                                    required options={materialOptions} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    placeholder="Enter Quantity"
                                    className="form-input"
                                    name='quantity'
                                    value={values.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="unitPrice">Unit Price</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    placeholder="Enter Unit Price"
                                    className="form-input"
                                    name='unitPrice'
                                    value={values.unitPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="total">Total</label>
                                <input
                                    id="totalPrice"
                                    type="text"
                                    value={`K ${Number(values.quantity) * Number(values.unitPrice)}`}
                                    className="form-input"
                                    disabled
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success mt-8 w-2/5 mx-auto gap-2">

                            {isSubmitting ? (
                                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle mr-4"></span>
                            ) : <SaveIcon />}
                            {isSubmitting ? "LOADING.." : purchase ? "Update" : "Save"}
                        </button>
                    </Form>
                )
            }
        </Formik>

    )
}

export default AddForm
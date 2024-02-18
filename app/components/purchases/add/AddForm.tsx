'use client'
import { SaveIcon } from '@/app/icons';
import { getAllFrimAsync, getAllMaterialAsync, selectFirms, selectMaterials, useDispatch, useSelector } from '@/lib/redux';
import { Form, Formik } from 'formik';
import React, { useEffect, } from 'react'
import Select from 'react-select';


const AddForm = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFrimAsync());
        dispatch(getAllMaterialAsync());
    }, []);

    const firms = useSelector(selectFirms);
    const materials = useSelector(selectMaterials);



    const firmOptions = firms.map(firm => ({
        value: firm.id,
        label: firm.name
    }))
    const materialOptions = materials.map(material => ({
        value: material.id,
        label: material.name
    }))



    return (
        <Formik
            initialValues={{
                MaterialId: 0,
                FirmId: 0,
                quantity: "",
                unitPrice: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(values);
                setSubmitting(false)
            }}
        >
            {
                ({ isSubmitting, values,setFieldValue, handleChange }) => (
                    <Form className="space-y-8" >
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
                                    options={materialOptions} />
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

                                />
                            </div>
                            <div>
                                <label htmlFor="total">Total</label>
                                <input
                                    id="totalPrice"
                                    type="text"
                                    value={'K 250'}
                                    className="form-input"
                                    disabled
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success mt-8 w-2/5 mx-auto gap-2">
                            <SaveIcon />
                            Save
                        </button>
                    </Form>
                )
            }
        </Formik>

    )
}

export default AddForm
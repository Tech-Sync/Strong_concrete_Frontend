'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import { coloredToast } from '@/utils/sweetAlerts';
import { PlusIcon } from '@/app/icons';
import { number, object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllProductAsync, selectProducts } from '@/lib/features/product/productSlice';
import { getAllFirmAsync, selectFirms, setFirmModal, updateFirmState } from '@/lib/features/firm/firmSlice';
import { getAllSaleAsync, selectSale, updateSaleState } from '@/lib/features/sale/saleSlice';
import { addSale, updateSale } from '@/lib/features/sale/saleActions';
import FirmModal from '../../firms/_components/FirmModal';

const baseTicketSchema = object({
    FirmId: number().required("Firm is required."),
    ProductId: number().required("Product is required."),
    quantity: number().required("Quantity is required."),
    location: string().required("Location is required."),
    sideContact: string().matches(
        /^\+\d{3}-\d{3}-\d{3}-\d{3}$/,
        "Phone number must be in the format +###-###-###-###"
    ).required("Phone number is required"),
    requestedDate: string().required("Requested Date is required."),
});

const SaleAdd = () => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const products = useAppSelector(selectProducts);
    const firms = useAppSelector(selectFirms);
    const sale = useAppSelector(selectSale);

    useEffect(() => {
        dispatch(getAllFirmAsync({}))
        dispatch(getAllProductAsync({}))
    }, [])


    const defaultParams = {
        name: "",
        address: "",
        phoneNo: "",
        tpinNo: "",
        email: "",
        status: "",
    };

    const firmOP = firms.data.filter(firm => firm.status === 1).map((firm) => ({
        label: firm.name,
        value: firm.id
    }))

    const productOP = products.data.map((product) => ({
        label: product.name,
        value: product.id,
        price: product.price
    }))


    const statusOp = [
        { label: 'PENDING', value: 1 },
        { label: 'APPROVED', value: 2 },
        { label: 'REJECTED', value: 3 },
        { label: 'CANCELLED', value: 4 },
    ]


    const formatDateForInput = (dateString: any) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JS months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const initialValueCustomer = firms.data.find(firm => firm.id === sale?.FirmId);


    const [selectedCustomer, setSelectedCustomer] = useState(initialValueCustomer);

    const initialValues = {
        id: sale?.id || 0,
        FirmId: sale?.FirmId || '',
        ProductId: sale?.ProductId || '',
        status: sale?.status || 1,
        location: sale?.location || '',
        quantity: sale?.quantity || 0,
        otherCharges: sale?.otherCharges || 0,
        unitPrice: sale?.unitPrice || 0,
        totalPrice: sale?.totalPrice || 0,
        discount: sale?.discount || 0,
        orderNumber: sale?.orderNumber || 0,
        requestedDate: sale?.requestedDate || '',
        orderDate: sale?.orderDate || '',
        sideContact: sale?.sideContact || '',
        // createdAt: sale?.createdAt || '',
        // updatedAt: sale?.updatedAt || '',
        // creatorId: sale?.creatorId || '',
        // updaterId: sale?.updaterId || '',

        // taxes: sale?.taxes || '16',
        // total_amount_due_date: formatDateForInput(sale?.total_amount_due_date) || new Date().toISOString(),
        // payment_terms: sale?.payment_terms || '',
        // additional_notes: sale?.additional_notes || '',
        // timestamp: sale?.timestamp || '',
        // updated: sale?.updated || '',
        // sale_items: sale?.sale_items.map(item => ({
        //     id: item.id,
        //     product: {
        //         id: item.product.id,
        //         name: item.product.name,
        //         price: item.product.price,
        //     },
        //     quantity: item.quantity,
        //     discounts: item.discounts
        // })) || [
        //         {
        //             id: 1,
        //             product: {
        //                 id: 0,
        //                 name: '',
        //                 price: 0,
        //             },
        //             quantity: 1,
        //             discounts: 0,
        //         },
        //     ]
    };


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={baseTicketSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    if (sale) {
                        const res = await updateSale(values)
                        setTimeout(() => {
                            if (res.message) {
                                setSubmitting(false);
                                resetForm();
                                router.replace('/sales')
                                coloredToast("success", res.message, "bottom-start");
                                // dispatch(getAllFrimAsync());
                                dispatch(updateSaleState(null))
                            } else {
                                coloredToast("danger", res.error, "bottom-start");
                            }
                        }, 500);
                    } else {
                        const { id, ...valuesToSend } = values
                        const res = await addSale(valuesToSend);
                        setTimeout(() => {
                            setSubmitting(false);
                            if (res.message) {
                                coloredToast("success", res.message, "bottom-start");
                                router.replace('/sales')
                                resetForm();
                                dispatch(getAllSaleAsync({}));
                            } else {
                                coloredToast("danger", res.error, "bottom-start");
                            }
                        }, 500);
                    }

                }}
            >
                {
                    ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (

                        <Form className="flex flex-col gap-2.5 xl:flex-row">
                            <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                                <div className="flex flex-wrap justify-between px-4">
                                    <div className="mb-6 w-full lg:w-1/2">
                                        <div className="flex shrink-0 items-center text-black dark:text-white">
                                            <Image src="/assets/images/logo.png" alt="img" width={120} height={120} />
                                        </div>
                                        <div className="mt-6 space-y-1 text-gray-500 dark:text-gray-400">
                                            <div>Mungwi, Lusaka west Mungwi road Lusaka ZM, 10101</div>
                                            <div>strong-concrete@gmail.com</div>
                                            <div>+260 (97) 123-4567</div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 lg:max-w-fit">
                                        <div className="flex items-center">
                                            <label htmlFor="number" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
                                                Invoice Number
                                            </label>
                                            <input id="number" type="text" name="inv-num" className="form-input w-2/3 lg:w-[250px]" readOnly />
                                        </div>
                                        {/*   <div className="mt-4 flex items-center">
                                            <label htmlFor="saleLabel" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
                                                Invoice Label
                                            </label>
                                            <input id="saleLabel" type="text" name="inv-label" className="form-input w-2/3 lg:w-[250px]" placeholder="Enter Invoice Label" />
                                        </div> */}
                                        {/*  <div className="mt-4 flex items-center">
                                            <label htmlFor="startDate" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
                                                Invoice Date
                                            </label>
                                            <input id="startDate" type="date" name="inv-date" className="form-input w-2/3 lg:w-[250px]" />
                                        </div> */}
                                        <div className="mt-4 flex items-center">
                                            <label htmlFor="requestedDate" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
                                                Requested Date
                                            </label>
                                            <div>
                                                <Field name='requestedDate' id="requestedDate" type="date" className="form-input w-2/3 lg:w-[250px]" />
                                                <ErrorMessage
                                                    name="requestedDate"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 " />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center">
                                            <label htmlFor="orderDate" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
                                                Confirmed Date
                                            </label>
                                            <Field name='orderDate' id="orderDate" type="date" className="form-input w-2/3 lg:w-[250px]" />
                                            <ErrorMessage
                                                name="orderDate"
                                                component="div"
                                                className="text-red-500 text-sm mt-1 " />
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
                                <div className="mt-8 px-4">
                                    <div className="flex flex-col justify-between lg:flex-row">
                                        <div className="mb-6 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
                                            <div className="text-lg underline underline-offset-4">Bill To :</div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="reciever-name" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Select Customer
                                                </label>
                                                <div className='flex-1'>
                                                    <div className="flex  items-center gap-2">
                                                        <div className=' flex-1'>
                                                            <Select placeholder="Select The Customer" options={firmOP}
                                                                // @ts-ignore
                                                                value={firmOP.find(option => option.value === values.FirmId)}
                                                                onChange={option => {
                                                                    setFieldValue('FirmId', option ? option.value : '');
                                                                    const selectedCustomer = firms.data.find(firm => firm.id === option?.value);
                                                                    // @ts-ignore
                                                                    setSelectedCustomer(selectedCustomer || null);
                                                                }}
                                                            />

                                                        </div>
                                                        <button onClick={() => { dispatch(setFirmModal(true)), dispatch(updateFirmState(defaultParams)) }} type="button" className="btn btn-outline-primary px-1 py-[7px]">
                                                            <PlusIcon />
                                                        </button>
                                                    </div>
                                                    <ErrorMessage
                                                        name="FirmId"
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1 " />
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="reciever-name" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Name
                                                </label>
                                                <input
                                                    id="reciever-name"
                                                    type="text"
                                                    name="reciever-name"
                                                    className="form-input flex-1"
                                                    // @ts-ignore
                                                    value={selectedCustomer ? `${selectedCustomer?.name} ` : ''}
                                                    placeholder="Enter Name" />
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="reciever-email" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Email
                                                </label>
                                                <input id="reciever-email" type="email" name="reciever-email" className="form-input flex-1" placeholder="Enter Email"
                                                    // @ts-ignore
                                                    value={selectedCustomer ? `${selectedCustomer?.email}` : ''}
                                                />
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="reciever-address" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Address
                                                </label>
                                                <input id="reciever-address" type="text" name="reciever-address" className="form-input flex-1" placeholder="Enter Address"
                                                    // @ts-ignore
                                                    value={selectedCustomer ? `${selectedCustomer?.address}` : ''}
                                                />
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="reciever-number" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Phone Number
                                                </label>
                                                <input id="reciever-number" type="text" name="reciever-number" className="form-input flex-1" placeholder="Enter Phone number"
                                                    // @ts-ignore
                                                    value={selectedCustomer ? `${selectedCustomer?.phoneNo}` : ''}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2">
                                            <div className="text-lg underline underline-offset-4">Delivery Details:</div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="acno" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Status
                                                </label>
                                                <Select placeholder="Select The Status" options={statusOp}
                                                    value={statusOp.find(option => option.value === values.status)}
                                                    onChange={option => { setFieldValue('status', option ? option.value : ''); }}
                                                    className='flex-1'
                                                />
                                                <ErrorMessage
                                                    name="status"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 " />
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="sideContact" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Side Contact Number
                                                </label>
                                                <div className='flex-1'>
                                                    <Field
                                                        as={MaskedInput}
                                                        id="sideContact"
                                                        name="sideContact"
                                                        type="text"
                                                        placeholder="+___-___-___-___"
                                                        className={`form-input  ${touched.sideContact && errors.sideContact ? "border-red-500" : ""}`}
                                                        mask={[
                                                            '+',
                                                            /\d/, /\d/, /\d/, // Allow up to three digits for the country code
                                                            '-',
                                                            /\d/, /\d/, /\d/, // First group of three digits
                                                            '-',
                                                            /\d/, /\d/, /\d/, // Second group of three digits
                                                            '-',
                                                            /\d/, /\d/, /\d/  // Third group of three digits
                                                        ]}
                                                    />
                                                    <ErrorMessage
                                                        name="sideContact"
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1 " />
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="location" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Delivery Address
                                                </label>
                                                <div className='flex-1'>
                                                    <Field id="location" type="text" name="location" className="form-input" placeholder="Enter Delivery Address" />
                                                    <ErrorMessage
                                                        name="location"
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1 " />
                                                </div>
                                            </div>
                                            {/*  <div className="mt-4 flex items-center">
                                                <label htmlFor="bank-name" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Bank Name
                                                </label>
                                                <input id="bank-name" type="text" name="bank-name" className="form-input flex-1" placeholder="Enter Bank Name" />
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="swift-code" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    SWIFT Number
                                                </label>
                                                <input id="swift-code" type="text" name="swift-code" className="form-input flex-1" placeholder="Enter SWIFT Number" />
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="iban-code" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    IBAN Number
                                                </label>
                                                <input id="iban-code" type="text" name="iban-code" className="form-input flex-1" placeholder="Enter IBAN Number" />
                                            </div>
                                            <div className="mt-4 flex items-center">
                                                <label htmlFor="country" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                    Country
                                                </label>
                                                <select id="country" name="country" className="form-select flex-1">
                                                    <option value="">Choose Country</option>
                                                    <option value="Zambia">Zambia</option>
                                                </select>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="" >
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th className="w-1">Quantity</th>
                                                    <th className="w-1">Price</th>
                                                    <th className="w-1">Disscount</th>
                                                    <th>Total</th>
                                                    <th className="w-1"></th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr className="align-top">
                                                    <td>
                                                        <Field
                                                            as={Select} placeholder="Select The Product"
                                                            name='ProductId'
                                                            options={productOP}
                                                            value={productOP.find(option => option.value === values.ProductId)}
                                                            //@ts-ignore
                                                            onChange={option => {
                                                                setFieldValue(`ProductId`, option ? option.value : '');
                                                                setFieldValue(`unitPrice`, option ? option.price : 0);
                                                            }}
                                                            className="min-w-[200px] "
                                                        />
                                                        <ErrorMessage
                                                            name="ProductId"
                                                            component="div"
                                                            className="text-red-500 text-sm mt-1 " />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            name='quantity'
                                                            type="number"
                                                            className="form-input w-32"
                                                            placeholder="Quantity"
                                                            min={0}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            name='unitPrice'
                                                            type="number"
                                                            className="form-input w-32"
                                                            placeholder="Price"
                                                            min={0}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            name='discount'
                                                            type="number"
                                                            className="form-input w-32"
                                                            placeholder="Disscount"
                                                            min={0}
                                                        />
                                                    </td>
                                                    <td >$ {(values.quantity * values.unitPrice) - values.discount}</td>
                                                    <td>
                                                        {/*    <button type="button" onClick={() => {
                                                            const newItems = values.sale_items.filter((item, i) => i !== index);
                                                            setFieldValue('sale_items', newItems);
                                                        }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
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
                                                        </button> */}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 flex flex-col justify-between px-4 sm:flex-row">
                                        <div className="mb-6 sm:mb-0">
                                            {/*  <button type="button" className="btn btn-primary" onClick={() => {
                                                const newItem = {
                                                    id: values.sale_items.length + 1,
                                                    product: {
                                                        id: 0,
                                                        name: '',
                                                        price: 0,
                                                    },
                                                    quantity: 1,
                                                    discounts: 0,
                                                }
                                                const newItems = [...values.sale_items, newItem];
                                                setFieldValue('sale_items', newItems);
                                            }}>
                                                Add Item
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 px-4">
                                    <label htmlFor="notes">Notes</label>
                                    <Field as='textarea' id="notes" name="additional_notes" className="form-textarea min-h-[130px]" placeholder="Notes...."></Field>
                                </div>
                            </div>
                            <div className="mt-6 w-full xl:mt-0 xl:w-96">
                                <div className="panel mb-5">
                                    {/* <label htmlFor="currency">Currency</label>
                                    <select id="currency" name="currency" className="form-select">
                                        {currencyList.map((i) => (
                                            <option key={i}>{i}</option>
                                        ))}
                                    </select> */}
                                    {/* <div className="mt-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="tax">Tax(%) </label>
                                                <Field id="tax" type="number" name="taxes" className="form-input" defaultValue={0} placeholder="Tax" readOnly />
                                            </div>
                                            <div>
                                                <label htmlFor="discounts">Discount(%) </label>
                                                <Field id="discounts" type="number" name="discounts" className="form-input" defaultValue={0} placeholder="Discount" readOnly />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="">
                                        <div>
                                            <label htmlFor="otherCharges">Other Charges($) </label>
                                            <Field id="otherCharges" type="number" name="otherCharges" className="form-input" defaultValue={0} placeholder="Other Charges" />
                                        </div>
                                    </div>
                                    {/*   <div className="mt-4">
                                        <label htmlFor="payment-method">Accept Payment Via</label>
                                        <Select placeholder="Select The Payment" options={paymentOp}
                                            value={paymentOp.find(option => option.value === values.payment_terms)}
                                            onChange={option => { setFieldValue('payment_terms', option ? option.value : ''); }}
                                            className='flex-1'
                                        />
                                    </div> */}
                                </div>
                                <div className="panel">
                                    <div className=''>
                                        {/* <div className="flex items-center justify-between">
                                                <div>Subtotal</div>
                                                <div>${ }</div>
                                            </div> */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <div>Tax(%)</div>
                                            <div>16%</div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div>Other Charges ($)</div>
                                            <div>${values.otherCharges}</div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div>Discount($)</div>
                                            <div>${values.discount}</div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between font-semibold">
                                            <div>Total</div>
                                            <div>${(values.quantity * values.unitPrice) + values.otherCharges - values.discount}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 mt-4">

                                        <button type="submit" className="btn btn-success w-full gap-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:mr-2 rtl:ml-2">
                                                <path
                                                    d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 11.6585 22 11.4878 21.9848 11.3142C21.9142 10.5049 21.586 9.71257 21.0637 9.09034C20.9516 8.95687 20.828 8.83317 20.5806 8.58578L15.4142 3.41944C15.1668 3.17206 15.0431 3.04835 14.9097 2.93631C14.2874 2.414 13.4951 2.08581 12.6858 2.01515C12.5122 2 12.3415 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M17 22V21C17 19.1144 17 18.1716 16.4142 17.5858C15.8284 17 14.8856 17 13 17H11C9.11438 17 8.17157 17 7.58579 17.5858C7 18.1716 7 19.1144 7 21V22"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path opacity="0.5" d="M7 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            Save
                                        </button>

                                        {/*  <button type="button" className="btn btn-info w-full gap-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:mr-2 rtl:ml-2">
                                                <path
                                                    d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path opacity="0.5" d="M6 18L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            Send Invoice
                                        </button>

                                        <Link href="/sale/preview" className="btn btn-primary w-full gap-2">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                                <path
                                                    opacity="0.5"
                                                    d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            Preview
                                        </Link>

                                        <button type="button" className="btn btn-secondary w-full gap-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:mr-2 rtl:ml-2">
                                                <path
                                                    opacity="0.5"
                                                    d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                                <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                            Download
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                }

            </Formik>
            <FirmModal />
        </>
    );
};

export default SaleAdd;

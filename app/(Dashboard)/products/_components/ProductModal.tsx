import { ModalCloseIcon, PlusIcon } from "@/app/icons";
import { Dialog, Transition } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { number, object, string } from "yup";
import { coloredToast } from "@/utils/sweetAlerts";
import { useRouter } from "next/navigation";
import { Product } from "@/types/types";
import Select, { SingleValue } from 'react-select';
import { AddressIcon, NameIcon, PhoneIcon } from "./ProductModalIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllMaterialAsync, selectMaterials } from "@/lib/features/material/materialSlice";
import { createProduct, updateProduct } from "@/lib/features/product/productActions";
import { getAllProductAsync } from "@/lib/features/product/productSlice";

const ProductSchema = object({
  name: string().required("This field is required."),
  price: number()
    .required("This field is required.")
    .positive("Price must be a positive number.")
});

interface firmModalProps {
  setModal: (value: boolean) => void;
  modal: boolean;
  productInitials: Product;
  setProductInitials: (value: object) => void;
}

interface Item {
  id: number;
  name: string;
  quantity: string;
}

export default function ProductModal({ modal, setModal, productInitials, setProductInitials, }: firmModalProps) {

  const router = useRouter();
  const dispatch = useAppDispatch()

  const defaultItems = [
    { id: 1, name: 'STONE', quantity: '', },
    { id: 2, name: 'SAND', quantity: '', },
    { id: 3, name: 'CEMENT', quantity: '', },
  ]

  const [items, setItems] = useState<Item[]>([]);
  const emptyProduct = { name: "", price: '' }


  useEffect(() => {
    dispatch(getAllMaterialAsync({}));
    if (productInitials.materials) {
      const initialItems: Item[] = Object.entries(productInitials?.materials)?.map(([name, quantity], index) => ({
        id: index + 1,
        name,
        quantity: quantity.toString(),
      }));

      setItems(initialItems);
    }
  }, [dispatch, productInitials]);

  const materials = useAppSelector(selectMaterials);

  const materialOptions = materials?.map(material => ({ value: material.id, label: material.name, }))

  const addItem = () => {
    let maxId = 0;
    maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;
    setItems([...items, { id: maxId + 1, name: '', quantity: '', },]);
  };

  const removeItem = (item: any = null) => { setItems(items?.filter((d: any) => d.id !== item.id)); };

  const changeQuantityPrice = (value: string, id: number) => {

    const updatedItems = items?.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSelectChange = (option: SingleValue<{ label: string; value: number }>, id: number) => {
    // Check if option is not null before proceeding
    if (option !== null) {
      const updatedItems = items?.map((item): Item => {
        if (item.id === id) {
          // Proceed knowing option is not null
          return { ...item, name: option.label, quantity: item.quantity ?? '' };
        }
        return item;
      });

      setItems(updatedItems);
    } else {
      // Handle the case when option is null, e.g., selection is cleared
      // You might want to reset the related fields in your items or handle it in some other way
      const updatedItems = items?.map((item): Item => {
        if (item.id === id) {
          // Reset name and MaterialId when selection is cleared
          return { ...item, name: '', quantity: item.quantity ?? '' };
        }
        return item;
      });

      setItems(updatedItems);
    }
  };

  const convertItems = (items: Item[]): Record<string, number> | false => {
    let hasIssues = false;
    const materials = items.reduce((acc: Record<string, number>, item: Item) => {
      if (!item.name || item.quantity === '') {
        hasIssues = true;
      } else if (acc.hasOwnProperty(item.name)) {
        hasIssues = true;
      } else {
        acc[item.name] = Number(item.quantity);
      }
      return acc;
    }, {});

    if (hasIssues) {
      return false;
    } else {
      return materials;
    }
  };

  return (
    <div>
      <button
        onClick={() => { setModal(true), setProductInitials(emptyProduct), setItems(defaultItems) }}
        className="btn btn-primary gap-2"
      >
        <PlusIcon />
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
          <div
            id="firm_modal"
            className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60"
          >
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
                <Dialog.Panel className="panel my-20 w-full max-w-lg overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                  <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white ">
                    <h5> {productInitials.id ? "Update The Product" : "Add New Product"}</h5>
                    <button
                      type="button"
                      onClick={() => setModal(false)}
                      className="text-white-dark hover:text-dark"
                    >
                      <ModalCloseIcon />
                    </button>
                  </div>
                  <div className="p-5">
                    <Formik
                      initialValues={productInitials.id ? productInitials : emptyProduct}
                      validationSchema={ProductSchema}
                      onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if ("id" in values) {
                          const res = await updateProduct(values);
                          if (res.message) {
                            coloredToast("success", res.message, "bottom-start");
                            setModal(false);
                            dispatch(getAllProductAsync({}));
                          } else {
                            coloredToast("danger", res.error, "bottom-start");
                          }
                        } else {
                          const materials = convertItems(items)
                          if (!materials) {
                            coloredToast("danger", 'Duplicate material name found or Quantity field empty.', "bottom-start");
                          } else {
                            const updatedValues = { ...values, materials }
                            const res = await createProduct(updatedValues);

                            setTimeout(() => {
                              setSubmitting(false);
                              if (res.message) {
                                coloredToast("success", res.message, "bottom-start");
                                setItems([{ id: 1, name: '', quantity: '', }])
                                setModal(false);
                                dispatch(getAllProductAsync({}));
                              } else {
                                coloredToast("danger", res.error, "bottom-start");
                              }
                            }, 500);

                          }

                        }
                      }}
                    >
                      {
                        ({ handleSubmit, touched, errors, isSubmitting }) => (
                          <Form onSubmit={handleSubmit}>
                            {items?.length <= 0 && (<span className="!text-center font-semibold">Items not selected.</span>)}
                            {
                              items?.map((item: any, i: any) => {
                                return (
                                  <div key={item.id} className="flex gap-x-2 mb-3">
                                    <Select
                                      name='FirmId'
                                      className='flex-1'
                                      placeholder={"Select a Material"}
                                      options={materialOptions}
                                      onChange={option => handleSelectChange(option, item.id)}
                                      value={materialOptions.find(option => option.label === item.name)}
                                    />
                                    <div className="flex-1">
                                      <div className="relative">
                                        <NameIcon />
                                        <input
                                          type="text"
                                          name={`items[${i}].quantity`}
                                          placeholder={
                                            item.name === 'SAND' || item.name === 'STONE' ? 'Quantity in Tone'
                                              : item.name === 'CEMENT' ? 'Quantity in Kg'
                                                : item.name === 'WATER' ? 'Quantity in Liter' : 'Quantity'}
                                          className={`form-input ltr:pl-10 rtl:pr-10`}
                                          onChange={(e) => changeQuantityPrice(e.target.value, item.id)}
                                          value={item.quantity}
                                        />
                                      </div>
                                    </div>
                                    <button type="button" onClick={() => removeItem(item)}>
                                      <ModalCloseIcon />
                                    </button>
                                  </div>)
                              })
                            }
                            <div className="flex justify-end sm:mb-4">
                              <button type="button" className="btn btn-primary p-1" onClick={() => { addItem() }}>
                                Add Item
                              </button>
                            </div>
                            <div className="mb-5">
                              <div className="relative">
                                <AddressIcon />
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="Product Name"
                                  className={`form-input  ltr:pl-10 rtl:pr-10${touched.name && errors.name ? "border-red-500" : ""}`}
                                />
                              </div>
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1 "
                              />
                            </div>

                            <div className="mb-5">
                              <div className="relative">
                                <PhoneIcon />
                                <Field
                                  type="number"
                                  name="price"
                                  placeholder="Unit Price"
                                  className={`form-input ltr:pl-10 rtl:pr-10${touched.price && errors.price ? "border-red-500" : ""}`}
                                />
                              </div>
                              <ErrorMessage
                                name="price"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary w-full"
                              disabled={isSubmitting}
                            >
                              {isSubmitting && (
                                <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle mr-4"></span>
                              )}
                              {isSubmitting ? "LOADING.." : "SUBMIT"}
                            </button>
                          </Form>
                        )
                      }
                    </Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

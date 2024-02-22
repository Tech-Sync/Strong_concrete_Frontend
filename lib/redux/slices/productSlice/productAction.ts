"use server";
import { auth } from "@/auth";
import { Product } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllProducts = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      cache: "no-cache",
      headers,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(
        data.message || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteProduct = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers,
    });

    const data = await response.json();

    if (!data.error && response.status === 202) {
      return { message: data.message, remainingData: data.data };
    } else {
      throw new Error( data.message ?? "Something went wrong, Please try again!");
    }

  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiProduct = async (ids: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/products/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ ids }),
    });

    const data = await response.json();

    if (!data.error && response.status === 202) {
      return { message: data.message, remainingData: data.data };
    } else {
      throw new Error( data.message ?? "Something went wrong, Please try again!");
    }
    
  } catch (error: any) {
    return { error: error.message };
  }
};

/* interface firmDataProp {
  name: string;
  address: string;
  phoneNo: string;
  tpinNo: string;
  email: string;
  status: string;
} */

export const createProduct = async (firmData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(firmData),
    });

    const data = await response.json();

    if (response.ok) {
      return { message: "Successfully Created!" };
    } else {
      throw new Error(
        data.message || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
export const updateProduct = async (firmData: Product) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/products/${firmData.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(firmData),
    });

    const data = await response.json();
    if (response.ok && data.isUpdated) {
      return { message: "Successfully Updated!" };
    } else {
      throw new Error(
        data.message || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

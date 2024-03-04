"use server";
import { auth } from "@/auth";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllSales = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/sales`, {
      cache: "no-cache",
      headers,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error( data.message || "Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteSale = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/sales/${id}`, {
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

export const deleteMultiSale = async (ids:any) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}/sales/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ids}),
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

export const readSale = async (id:string) => {
  const headers = await authConfig();
  
  try {
    const response = await fetch(`${BASE_URL}/sales/${id}`, {
      headers,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error( data.message || "Something went wrong, Please try again!");
    }

  } catch (error:any) {
    return { error: error.message };
  }

}

export const addSale = async (saleData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/sales`, {
      method: "POST",
      headers,
      body: JSON.stringify(saleData),
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

interface updateData{
  id: string | number,
  MaterialId: string | number,
  FirmId: string | number,
  quantity: string | number,
  unitPrice: string | number,
}

export const updateSale = async (saleData: updateData) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/sales/${saleData.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(saleData),
    });

    const data = await response.json();

    if (response.ok && data.isUpdated) {
      return { message: "Successfully Updated!" };
    } else {
      throw new Error( data.message || "Something went wrong, Please try again!" );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
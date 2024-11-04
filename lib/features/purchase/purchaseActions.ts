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

export const getAllPurchases = async (firmId: { firmId?: string }) => {
  const headers = await authConfig();


  let url = `${BASE_URL}/purchases`

  if (firmId) url = `${BASE_URL}/purchases/?search[FirmId]=${firmId}`

  try {
    const response = await fetch(url, {
      cache: "no-cache",
      headers,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deletePurchase = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchases/${id}`, {
      method: "DELETE",
      headers,
    });

    const data = await response.json();

    if (!data.error && response.status === 202) {
      return { message: data.message, remainingData: data.data };
    } else {
      throw new Error(data.message ?? "Something went wrong, Please try again!");
    }

  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiPurchase = async (ids: any) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}/purchases/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ ids }),
    });

    const data = await response.json();

    if (!data.error && response.status === 202) {
      return { message: data.message, remainingData: data.data };
    } else {
      throw new Error(data.message ?? "Something went wrong, Please try again!");
    }

  } catch (error: any) {
    return { error: error.message };
  }
};

export const readPurchase = async (id: string) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}/purchases/${id}`, {
      headers,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Something went wrong, Please try again!");
    }

  } catch (error: any) {
    return { error: error.message };
  }

}

export const addPurchase = async (purchaseData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchases`, {
      method: "POST",
      headers,
      body: JSON.stringify(purchaseData),
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

interface updateData {
  id: string | number,
  MaterialId: string | number,
  FirmId: string | number,
  quantity: string | number,
  unitPrice: string | number,
}

export const updatePurchase = async (purchaseData: updateData) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchases/${purchaseData.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(purchaseData),
    });

    const data = await response.json();

    if (response.ok && data.isUpdated) {
      return { message: "Successfully Updated!" };
    } else {
      throw new Error(data.message || "Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
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

export const getAllPurchaseAccAccs = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchase_accounts`, {
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

export const deletePurchaseAcc = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchase_accounts/${id}`, {
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

export const deleteMultiPurchaseAcc = async (ids:any) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}/purchase_accounts/multiple-delete`, {
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

export const readPurchaseAcc = async (id:string) => {
  const headers = await authConfig();
  
  try {
    const response = await fetch(`${BASE_URL}/purchase_accounts/${id}`, {
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

export const addPurchaseAcc = async (purchaseData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchase_accounts`, {
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

interface updateData{
  id: string | number,
  MaterialId: string | number,
  FirmId: string | number,
  quantity: string | number,
  unitPrice: string | number,
}

export const updatePurchaseAcc = async (purchaseData: updateData) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchase_accounts/${purchaseData.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(purchaseData),
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
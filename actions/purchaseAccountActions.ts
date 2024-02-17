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

export const getAllPurchaseAccounts = async () => {
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
      throw new Error(
        data.message || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deletePurchaseAccount = async (id: any) => {
  const headers = await authConfig();
  try {
    console.log('id?:',id);
    const response = await fetch(`${BASE_URL}/purchase_accounts/${id}`, {
      method: "DELETE",
      headers,
    });

    if (response.status === 204 || response.status === 202) {
      return { message: "Deleted!" };
    } else {
      console.log('id:',id);
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiPurchaseAccount = async (ids:any) => {
  const headers = await authConfig();
  console.log('successfully deleted the selected accounts');

  try {
    const response = await fetch(`${BASE_URL}/purchase_accounts/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ids}),
    });

    if (response.status === 204 || response.status === 202) {
      return { message: "successfully deleted the selected accounts!" };
    } else {
      console.log('ids:',JSON.stringify({ids}));
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

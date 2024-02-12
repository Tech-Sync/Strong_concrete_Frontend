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

export const getAllPurchases = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchases`, {
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

export const deletePurchase = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/purchases/${id}`, {
      method: "DELETE",
      headers,
    });

    if (response.status === 204) {
      return { message: "Deleted!" };
    } else {
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiPurchase = async (ids:any) => {
  const headers = await authConfig();
  console.log('multidelete purchase calisti');

  try {
    const response = await fetch(`${BASE_URL}/purchases/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ids}),
    });

    if (response.status === 204) {
      return { message: "Deleted!" };
    } else {
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};


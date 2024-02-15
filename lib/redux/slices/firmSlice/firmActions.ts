"use server";
import { auth } from "@/auth";
import { Firm } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllFirms = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms`, {
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

export const deleteFirm = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms/${id}`, {
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

export const deleteMultiFirm = async (ids: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms/multiple-delete`, {
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

export const addFirm = async (firmData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms`, {
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
export const updateFirm = async (firmData: Firm) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms/${firmData.id}`, {
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

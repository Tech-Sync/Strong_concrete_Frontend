"use server";
import { auth } from "@/auth";
import { Production } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllProductions = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/productions`, {
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

export const deleteProduction = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/productions/${id}`, {
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

export const deleteMultiProduction = async (ids: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/productions/multiple-delete`, {
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


export const addProduction = async (productionData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/productions`, {
      method: "POST",
      headers,
      body: JSON.stringify(productionData),
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
export const updateProduction = async (productionData:any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/productions/${productionData?.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(productionData),
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
export const updateProductionStatus = async (productionId:number, statusId:number) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/productions/${productionId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({status: statusId}),
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

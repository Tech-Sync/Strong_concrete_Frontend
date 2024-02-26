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

export const getAllVehicles = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/vehicles`, {
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

export const deleteVehicle = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/vehicles/${id}`, {
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

export const deleteMultiVehicle = async (ids: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/vehicles/multiple-delete`, {
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

export const createVehicle = async (vehicleData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/vehicles`, {
      method: "POST",
      headers,
      body: JSON.stringify(vehicleData),
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
export const updateVehicle = async (vehicleData: Product) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/vehicles/${vehicleData.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(vehicleData),
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

"use server";
import { auth } from "@/auth";
import { Delivery } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllDeliveries = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/deliveries`, {
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

export const deleteDelivery = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/deliveries/${id}`, {
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

export const deleteMultiDelivery = async (ids: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/deliveries/multiple-delete`, {
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


export const addDelivery = async (deliveriesData: Object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/deliveries`, {
      method: "POST",
      headers,
      body: JSON.stringify(deliveriesData),
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
export const updateDelivery = async (deliveriesData: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/deliveries/${deliveriesData?.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(deliveriesData),
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
export const updateDeliveryStatus = async (deliveriesId: number, statusId: number) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/deliveries/${deliveriesId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ status: statusId }),
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

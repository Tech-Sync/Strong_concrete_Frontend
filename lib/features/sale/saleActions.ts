"use server";
import { auth } from "@/auth";
import { Sale } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllSales = async (page?: string, limit?: string) => {
  const headers = await authConfig();

  let url = `${BASE_URL}/sales`;

  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  if (params.toString()) url += `?${params.toString()}`;

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
      throw new Error(data.message ?? "Something went wrong, Please try again!");
    }

  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiSale = async (ids: any) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}/sales/multiple-delete`, {
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

export const readSale = async (id: string) => {
  const headers = await authConfig();

  try {
    const response = await fetch(`${BASE_URL}/sales/${id}`, {
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
export const getWeeklySale = async (startDate: string, endDate: string) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/sales/w?startDate=${startDate}&endDate=${endDate}`, {
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
export const updateOrder = async (orderId: string, updateOrderBody: object) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/sales/update-order/${orderId}`, {
      method: "POST",
      headers,
      body: JSON.stringify(updateOrderBody),
    });

    const data = await response.json();
    if (response.ok) {
      if (!data.isError) {
        return { message: data.data };
      } else {
        return { message: "Something went wrong, Please try again!" };
      }
    } else {
      throw new Error(
        data.message || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};




export const updateSale = async (saleData: any) => {
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
      throw new Error(data.message || "Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
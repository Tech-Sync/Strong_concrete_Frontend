"use server";
import { auth } from "@/auth";
import { User } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllUsers = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/users`, {
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

export const deleteUser = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
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

export const deleteMultiUser = async (ids: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/users/multiple-delete`, {
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

export const createUser = async (userData: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers,
      body: JSON.stringify(userData),
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

export const updateUser = async (userId: string, userData: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
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


export const getFilteredUsers = async (filter: string) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/users?${filter}`, {
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


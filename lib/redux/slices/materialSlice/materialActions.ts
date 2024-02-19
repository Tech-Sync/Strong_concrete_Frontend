"use server";
import { auth } from "@/auth";
import {  Material } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllMaterials = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/materials`, {
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

export const deleteMaterial = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/materials/${id}`, {
      method: "DELETE",
      headers,
    });

    if (response.status === 204||response.status === 202) {
      return { message: "Deleted!" };
    } else {
      
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiMaterial = async (ids: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/materials/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ ids }),
    });

    if (response.status === 204||response.status === 202) {
      return { message: "Deleted!" };
    } else {
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};


export const addMaterial = async (materialData: Object) => {
  const headers = await authConfig();
  
  try {
    const response = await fetch(`${BASE_URL}/materials`, {
      method: "POST",
      headers,
      body: JSON.stringify(materialData),
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
export const updateMaterial = async (materialData: Material) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/materials/${materialData.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(materialData),
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

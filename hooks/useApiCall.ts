import React from "react";
import useFetch from "./useFetch";

export default function useApiCall() {
  const fetchWithAuth = useFetch();

  const getMaterials = async () => {
    try {
      const response = await fetchWithAuth("materials", { method: "GET" });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("hata olustu");
    }
  };

  return { getMaterials };
}

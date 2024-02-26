import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllProducts } from "./productAction";

export const getAllProductAsync = createAppAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await getAllProducts();
    return response.data;
  }
);

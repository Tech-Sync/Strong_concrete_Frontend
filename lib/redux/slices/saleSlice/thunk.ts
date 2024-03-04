import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllSales } from "./saleActions";

export const getAllSaleAsync = createAppAsyncThunk(
  "sale/getAllSales",
  async () => {
    const response = await getAllSales();
    return response.data;
  }
);

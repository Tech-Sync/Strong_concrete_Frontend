import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllPurchases } from "./purchaseActions";

export const getAllPurchaseAsync = createAppAsyncThunk(
  "purchase/getAllPurchases",
  async () => {
    const response = await getAllPurchases();
    return response.data;
  }
);

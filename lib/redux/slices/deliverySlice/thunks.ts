import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllDeliveries } from "./deliveryActions";

export const getAllDeliveryAsync = createAppAsyncThunk(
  "Delivery/getAllDeliveryAsync",
  async () => {
    try {
      const response = await getAllDeliveries();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      throw new Error("Data fetch failed: " + (error as Error).message);
    }
  }
);

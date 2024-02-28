import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllVehicles } from "./vehicleActions";

export const getAllVehicleAsync = createAppAsyncThunk(
  "vehicle/getAllVehicles",
  async () => {
    const response = await getAllVehicles();
    return response.data;
  }
);

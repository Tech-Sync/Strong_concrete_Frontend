import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllProductions } from "./ProductionActions";

export const getAllProductionAsync = createAppAsyncThunk(
  "production/getAllProductions",
  async () => {
    const response = await getAllProductions();
    return response.data;
  }
);

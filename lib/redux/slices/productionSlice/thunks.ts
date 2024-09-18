import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllProductions } from "./productionActions";

export const getAllProductionAsync = createAppAsyncThunk(
  "Production/getAllProductions",
  async () => {
    const response = await getAllProductions();
    return response.data;
  }
);

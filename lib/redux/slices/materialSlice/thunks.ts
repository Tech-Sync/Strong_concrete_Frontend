import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllMaterials } from "./materialActions";

export const getAllMaterialAsync = createAppAsyncThunk(
  "firm/getAllMaterials",
  async () => {
    const response = await getAllMaterials();

    return response.data;
  }
);

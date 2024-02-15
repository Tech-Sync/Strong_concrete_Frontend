import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllMaterials } from "./materialActions";

export const getAllMaterialAsync = createAppAsyncThunk(
  "material/getAllMaterials",
  async () => {
    const response = await getAllMaterials();
    return response.data;
  }
);

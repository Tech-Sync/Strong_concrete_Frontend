import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllFirms } from "./firmActions";

export const getAllFrimAsync = createAppAsyncThunk(
  "firm/getAllFirms",
  async () => {
    const response = await getAllFirms();

    return response.data;
  }
);

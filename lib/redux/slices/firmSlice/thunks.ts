import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllFirms } from "./firmActions";

export const getFrimAsync = createAppAsyncThunk(
  "firm/getAllFirms",
  async () => {
    const response = await getAllFirms();

    return response.data;
  }
);

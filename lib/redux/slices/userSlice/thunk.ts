import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllUser } from "./userActions";

export const getAllUserAsync = createAppAsyncThunk(
  "user/getAllUsers",
  async () => {
    const response = await getAllUser();
    return response.data;
  }
);

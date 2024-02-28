import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllUsers } from "./userActions";

export const getAllUsersAsync = createAppAsyncThunk(
  "user/getAllUsers",
  async () => {
    const response = await getAllUsers();
    return response.data;
  }
);

import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllPurchaseAccounts } from "./accountsAction";

export const getAllAccountsAsync = createAppAsyncThunk(
  "accounts/getAllAccounts",
  async () => {
    const response = await getAllPurchaseAccounts();
    return response.data;
  }
);

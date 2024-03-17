import { WeeklySale } from "@/types/types";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { getAllSales, getWeeklySale } from "./saleActions";

export const getAllSaleAsync = createAppAsyncThunk(
  "sale/getAllSales",
  async () => {
    const response = await getAllSales();
    return response.data;
  }
);

interface GetWeeklySaleArgs {
  startDate: string;
  endDate: string;
}

export const getWeeklySaleAsync = createAppAsyncThunk<WeeklySale[], GetWeeklySaleArgs>(
  "sale/getWeeklySales",
  async ({ startDate, endDate }) => {
    const response = await getWeeklySale( startDate, endDate );
    return response.weeklySale;
  }
);

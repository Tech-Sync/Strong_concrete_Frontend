/* Instruments */
import { counterSlice, firmSlice, materiaSlice, productSlice, purchaseSlice, saleSlice, themeConfigSlice, userSlice, vehicleSlice, } from "./slices";
// import { themeConfigSlice } from "./slices/themeConfigSlice";

export const reducer = {
  counter: counterSlice.reducer,
  theme: themeConfigSlice.reducer,
  firm: firmSlice.reducer,
  material: materiaSlice.reducer,
  purchase:purchaseSlice.reducer,
  product: productSlice.reducer,
  vehicle:vehicleSlice.reducer,
  user: userSlice.reducer,
  sale: saleSlice.reducer
};

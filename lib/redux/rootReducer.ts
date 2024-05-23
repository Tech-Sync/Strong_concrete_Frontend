/* Instruments */
import { counterSlice, deliverySlice, firmSlice, materiaSlice, productSlice,  productionSlice,  purchaseSlice, saleSlice, themeConfigSlice, userSlice, vehicleSlice, } from "./slices";
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
  sale: saleSlice.reducer,
  production: productionSlice.reducer,
  delivery: deliverySlice.reducer,
};

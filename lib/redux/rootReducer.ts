/* Instruments */
import { counterSlice, firmSlice, materiaSlice, productSlice, purchaseSlice, themeConfigSlice, } from "./slices";
// import { themeConfigSlice } from "./slices/themeConfigSlice";

export const reducer = {
  counter: counterSlice.reducer,
  theme: themeConfigSlice.reducer,
  firm: firmSlice.reducer,
  material: materiaSlice.reducer,
  purchase:purchaseSlice.reducer,
  product:productSlice.reducer
};

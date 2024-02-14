/* Instruments */
import { counterSlice, firmSlice, materiaSlice, themeConfigSlice, } from "./slices";
// import { themeConfigSlice } from "./slices/themeConfigSlice";

export const reducer = {
  counter: counterSlice.reducer,
  theme: themeConfigSlice.reducer,
  firm: firmSlice.reducer,
  material: materiaSlice.reducer,
};

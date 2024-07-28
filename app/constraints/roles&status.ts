export const userRoles: { [key: string]: string } = {
  1: "DRIVER",
  2: "PRODUCER",
  3: "ACCOUNTANT",
  4: "SALER",
  5: "ADMIN",
};
export const deliveryStatuses: { [key: string]: string } = {
  1: "LOADING",
  2: "ON THE WAY",
  3: "DELIVERIED",
  4: "DONE",
  5: "CANCELLED",
};
export const vehicleStatuses: { [key: string]: string } = {
  1: "HOME",
  2: "LOADING",
  3: "ON THE WAY",
  4: "ARRIVED",
  5: "VEHICLE IN RETURN",
};
export const firmStatuses = {
  1: "CONSUMER",
  2: "SUPPLIER",
};
export const productionStatuses: { [key: string]: string } = {
  1: "PLANNED",
  2: "BEING PRODUCED",
  3: "WAITING VEHICLE",
  4: "PRODUCED",
  5: "CANCELLED",
  6: "INSUFFICIENT MATERIAL",
  7: "PRODUCED AND CANCELLED",
};
export const saleStatuses: { [key: string]: string } = {
  1: "PENDING",
  2: "APPROVED",
  3: "REJECTED",
  4: "CANCELLED",
};

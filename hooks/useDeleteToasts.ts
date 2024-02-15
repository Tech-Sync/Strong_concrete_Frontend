import { useDispatch } from "@/lib/redux";
import { Firm, Material } from "@/types/types";
import { PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const useDeleteToasts = () => {

  type DeletionFunction = (id: any
  ) => Promise<{ message?: string; error?: string; remainingData?: any }>;

  type UpdateAction<T> = (data: T) => {payload: T; type: string;};

  const dispatch = useDispatch();

  const deleteToast = async <T> (id: any,deletionFunction: DeletionFunction,updateAction: UpdateAction<T>): Promise<boolean> => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Delete",
        padding: "2em",
        customClass: "sweet-alerts",
      });

      if (result.isConfirmed) {
        const res = await deletionFunction(id);

        dispatch(updateAction(res.remainingData ?? []));

        if (res?.message) {
          await Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            customClass: "sweet-alerts",
          });
          return true;
        } else {
          await Swal.fire({
            title: "Error",
            text: res?.error,
            icon: "error",
            customClass: "sweet-alerts",
          });
          return false;
        }
      }
    } catch (error) {
      console.error("Error in deleteToast:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred.",
        icon: "error",
        customClass: "sweet-alerts",
      });
    }
    return false;
  };
  //@ts-ignore
  const multiDeleteToast = async( ids: any,deletionFunction: DeletionFunction,updateAction: UpdateAction): Promise<boolean> => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Delete",
        padding: "2em",
        customClass: "sweet-alerts",
      });

      if (result.isConfirmed) {
        console.log('onaylandi');
        const res = await deletionFunction(ids);
        dispatch(updateAction(res.remainingData ?? []));

        if (res?.message) {
          await Swal.fire({
            title: "Deleted!",
            text: res.message,
            icon: "success",
            customClass: "sweet-alerts",
          });
          return true;
        } else {
          console.log('else kismi');
          await Swal.fire({
            title: "Error",
            text: res?.error,
            icon: "error",
            customClass: "sweet-alerts",
          });
          return false;
        }
      }
    } catch (error) {
      console.log('catch ksimi');
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred.",
        icon: "error",
        customClass: "sweet-alerts",
      });
    }
    return false;
  };

  return { deleteToast, multiDeleteToast };
};

export default useDeleteToasts;

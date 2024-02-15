import { updateFirm, useDispatch } from "@/lib/redux";
import { Firm } from "@/types/types";
import Swal from "sweetalert2";

const useDeleteToasts = () => {
  type DeletionFunction = (
    id: any
  ) => Promise<{ message?: string; error?: string; remainingData?: Firm[] }>;

  const dispatch = useDispatch();

  const deleteToast = async (
    id: any,
    deletionFunction: DeletionFunction
  ): Promise<boolean> => {
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

        if (res.remainingData !== undefined)
          dispatch(updateFirm(res.remainingData));
        else dispatch(updateFirm([]));

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

  const multiDeleteToast = async (
    ids: any,
    deletionFunction: DeletionFunction
  ): Promise<boolean> => {
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
        const res = await deletionFunction(ids);
        
        if (res.remainingData !== undefined)
          dispatch(updateFirm(res.remainingData));
        else dispatch(updateFirm([]));

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

  return { deleteToast, multiDeleteToast};
};

export default useDeleteToasts;

import { forgetPassword } from "@/actions/authActions";
import { Firm } from "@/types/types";
import Swal, { SweetAlertPosition } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const successToast = (msg: string) => {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });
  toast.fire({
    icon: "success",
    title: msg,
    padding: "10px 20px",
  });
};

export const coloredToast = (
  color: string,
  msg: string,
  position: SweetAlertPosition = "top-end"
) => {
  let openEmail = false;
  if (msg.startsWith("Please verify")) {
    openEmail = true;
  }

  const toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer: openEmail ? 20000 : 5000,
    showCloseButton: false,
    customClass: {
      popup: `color-${color}`,
    },
  });

  toast.fire({
    title: openEmail
      ? `${msg} <a href="https://mail.google.com/mail/u/0/#search/Strong+Concrete" style="color: black; text-decoration: underline;">Check your inbox!</a>`
      : msg,
  });
};

export const forgetPasswordToast = async () => {
  const { value: email } = await Swal.fire({
    title: "Reset password with Email",
    input: "email",
    inputLabel: "A verification code will be send to this mail account.",
    inputPlaceholder: "Enter your email address",
    showCancelButton: true,
  });
  if (email) {
    const res = await forgetPassword(email);
    if (res?.message) {
      Swal.fire(`${res?.message} Check your emails please.`);
    } else {
      Swal.fire(res?.error);
    }
  }
};

// eugurlu feature
type DeletionFunction = (
  id: any
) => Promise<{ message?: string; error?: string }>;

export const deleteToast = async (
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
      if (res?.message) {
        await Swal.fire({
          title: "Deleted!",
          text: "It has been deleted.",
          icon: "success",
          customClass: "sweet-alerts",
        });
        return true;
      } else {
        await Swal.fire({
          title: "Error",
          text: res?.error || "An error occurred while trying to delete.",
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

export const multiDeleteToast = async (
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
      if (res?.message) {
        await Swal.fire({
          title: "Deleted!",
          text: "It has been deleted.",
          icon: "success",
          customClass: "sweet-alerts",
        });
        return true;
      } else {
        await Swal.fire({
          title: "Error",
          text: res?.error || "An error occurred while trying to delete.",
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

export const updateToast = async (
  id: any,
  data: any,
  updateFunction: (id: any, data: any) => Promise<{ message?: string; error?: string }>
): Promise<boolean> => {
  try {
    const result = await updateFunction(id, data); // Call the update function
    
    if (result?.message) {
      await Swal.fire({
        title: "Updated!",
        text: result.message,
        icon: "success",
        customClass: "sweet-alerts",
      });
      return true;
    } else {
      await Swal.fire({
        title: "Error",
        text: result?.error || "An error occurred while trying to update.",
        icon: "error",
        customClass: "sweet-alerts",
      });
      return false;
    }
  } catch (error) {
    console.error("Error in updateToast:", error);
    await Swal.fire({
      title: "Error",
      text: "An unexpected error occurred.",
      icon: "error",
      customClass: "sweet-alerts",
    });
    return false;
  }
};


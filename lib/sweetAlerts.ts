import Swal from "sweetalert2";
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

export const coloredToast = (color: string, msg: string) => {
  let openEmail = false;
  if (msg.startsWith("Please verify")) {
    openEmail = true;
  }

  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: openEmail ? 10000 : 3000,
    showCloseButton: false,
    customClass: {
      popup: `color-${color}`,
    },
  });
  toast.fire({
    title: openEmail
      ? `${msg} <a href="https://mail.google.com/mail/u/0/#advanced-search/from=Strong+Concrete&subset=all&within=1d&sizeoperator=s_sl&sizeunit=s_smb" style="color: black; text-decoration: underline;">Click Here</a>`
      : msg,
  });
};

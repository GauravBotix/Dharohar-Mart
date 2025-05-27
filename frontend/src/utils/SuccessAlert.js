import Swal from "sweetalert2";
const successAlert = (title) => {
  const alert = Swal.fire({
    icon: "success",
    title: "Congratulation",
    text: title,
    confirmButtonColor: "green",
  });
  return alert;
};

export default successAlert;

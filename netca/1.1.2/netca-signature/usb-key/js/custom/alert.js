const originAlert = window.alert;

window.alert = function (message) {
  if (Swal) {
    Swal.fire({
      icon: "info",
      text: message,
      confirmButtonText: "确定",
      allowOutsideClick: false,
    });
  } else {
    originAlert(message);
  }
};

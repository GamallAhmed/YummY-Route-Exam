// Form Validition


const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const numberInput = document.getElementById("numberInput");
const ageInput = document.getElementById("ageInput");
const passwordInput = document.getElementById("inputPassword");
const repasswordInput = document.getElementById("repassword");
const submitButton = document.getElementById("submitButton");

const regexPatterns = {
  nameInput: /^[a-zA-Z\s]{4,10}$/,
  emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/,
  numberInput: /^01[0-2,5]{1}[0-9]{8}$/,
  ageInput: /^(?:[1-9]|[1-9][0-9]|100)$/,
  inputPassword: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
  repassword: function () {
    return repasswordInput.value === passwordInput.value;
  },
};

function validateInput(input) {
  const regex = regexPatterns[input.id];
  if (typeof regex === "function") {
    return regex();
  } else {
    return regex.test(input.value);
  }
}

function updateValidation() {
  let allValid = true;

  Object.keys(regexPatterns).forEach((key) => {
    const input = document.getElementById(key);
    if (validateInput(input)) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      allValid = false;
    }
  });

  submitButton.disabled = !allValid;
}
[
  nameInput,
  emailInput,
  numberInput,
  ageInput,
  passwordInput,
  repasswordInput,
].forEach((input) => {
  input.addEventListener("input", updateValidation);
});

submitButton.addEventListener("click", () => {
  Swal.fire({
    title: "Success",
    text: "Form submitted successfully!",
    icon: "success",
    showCancelButton: false,
  }).then(() => {
    [
      nameInput,
      emailInput,
      numberInput,
      ageInput,
      passwordInput,
      repasswordInput,
    ].forEach((input) => {
      input.value = "";
      input.classList.remove("is-valid");
    });
    submitButton.disabled = true;
  });
});

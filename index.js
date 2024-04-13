const form = document.querySelector(".needs-validation");
const resultText = document.getElementById("result-text");
const modalBody = document.querySelector(".modal-body");
const numericInput = document.getElementById("numericInput");
const ExtraInput = document.getElementById("extra_numericInput");
const DeductionInput = document.getElementById("deduction_numericInput");
const tooltip = document.querySelector(".tool-tip");
const inputs = document.querySelectorAll(".inp");

numericInput.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  const numericRegex = /^[0-9]*$/;

  if (!numericRegex.test(inputValue)) {
    event.target.setCustomValidity("Only numerical values are allowed.");
  } else {
    event.target.setCustomValidity("");
  }
});
ExtraInput.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  const numericRegex = /^[0-9]*$/;

  if (!numericRegex.test(inputValue)) {
    event.target.setCustomValidity("Only numerical values are allowed.");
  } else {
    event.target.setCustomValidity("");
  }
});
DeductionInput.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  const numericRegex = /^[0-9]*$/;

  if (!numericRegex.test(inputValue)) {
    event.target.setCustomValidity("Only numerical values are allowed.");
  } else {
    event.target.setCustomValidity("");
  }
});

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    modalBody.querySelectorAll("*").forEach((child) => {
      child.style.display = "none";
    });

    const errorMessage = document.createElement("h3");
    errorMessage.textContent = "Error in input";

    modalBody.appendChild(errorMessage);
  } else {
    event.preventDefault();
    event.stopPropagation();
    console.log("correct");
    const childToRemove = modalBody.querySelector("h3");

    if (childToRemove) {
      modalBody.removeChild(childToRemove);
    }
    modalBody.querySelectorAll("*").forEach((child) => {
      child.style.display = "block";
    });

    const formData = new FormData(this);

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const { annual_income, extra_income, age_group, deductions } = formObject;
    const income =
      Number(annual_income) + Number(extra_income) - Number(deductions);
    console.log("Income: ", income);
    let tax = 0;
    if (income > 800000) {
      if (age_group === "lt40") {
        tax = 0.3 * (income - 800000);
      } else if (age_group === "gt40&lt60") {
        tax = 0.4 * (income - 800000);
      } else if (age_group === "gt60") {
        tax = 0.1 * (income - 800000);
      }
    }

    const final_income = income - tax;
    resultText.innerHTML = final_income.toLocaleString();

    console.log("final_income: ", final_income);
  }

  form.classList.add("was-validated");
});

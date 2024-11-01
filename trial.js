"use strict";
// NOTE TO SELF::: Some functions malfunction when variable declarations are made outside of them.
const calC = document.querySelector("html");

// params to clear
const clearBtn = document.querySelector(".clear");
const calcInputs = document.querySelectorAll(".user-input");
let radioButtons = document.querySelectorAll(".radio-btn");
const resultDisplayEmpty = document.querySelector(".result__display-empty");
const resultDisplayCompleted = document.querySelector(
  ".result__display-completed"
);
const errorMessages = document.querySelectorAll(".input__field span");

// FUNCTION - clear computations
function clearComputations() {
  // clear all inputs
  calcInputs.forEach((calcInput) => {
    calcInput.value = "";
    console.log(`i was clicked`);

    radioButtons.forEach((radioBtn) => {
      radioBtn.checked = false;
    });

    // code to clear error message and errorStyles
    const inputFieldTexts = document.querySelectorAll(".input__field-text");
    inputFieldTexts.forEach((text, index) => {
      const icon = inputFieldIcons[index];
      const error = errorMessages[index];

      text.classList.remove("text-error");
      icon.classList.remove("icon-error");
      error.classList.remove("span");
      error.classList.add("no_display");
      document.querySelector(".type_err").classList.remove("span");
      document.querySelector(".type_err").classList.add("no_display");
    });
  });

  // Hide completed result and show empty result
  resultDisplayEmpty.classList.remove("no_display");
  resultDisplayCompleted.classList.add("no_display");
}

// ACTION - clear computations
clearBtn.onclick = () => {
  clearComputations();
};

// FUNCTION - calculate mortgage
function calculateMortgage() {
  // params to compute
  const mortgageAmount = document.querySelector("#text__mort-amount").value;
  const mortgageTerm = document.querySelector("#text__mort-term").value;
  const interestRate = document.querySelector("#text__mort-rate").value;
  const mortgageType = document.querySelector(".radio-btn:checked");
  const amount = parseFloat(mortgageAmount);
  const term = parseFloat(mortgageTerm);
  const rate = parseFloat(interestRate) / 100;
  // calculate total-repayment and total-interest amounts
  const totalInterestRepayment = amount * rate;
  const totalAmountRepayment = amount + totalInterestRepayment;

  // calculate monthly payments
  const monthlyAmountRepayment = totalAmountRepayment / (term * 12); // total payment including interest
  const monthlyInterest = totalInterestRepayment / (term * 12); // interest-only payment

  let monthlyPayment;
  let totalRepaymentDisplay;
  if (mortgageType.value === "repayment") {
    monthlyPayment = monthlyAmountRepayment;
    totalRepaymentDisplay = totalAmountRepayment;
  } else if (mortgageType.value === "interest-only") {
    monthlyPayment = monthlyInterest; // interest-only payment
    totalRepaymentDisplay = totalInterestRepayment;
  }

  //  display after computation
  document.querySelector(
    ".monthly-price"
  ).textContent = `£${monthlyPayment.toFixed(2)}`; //to 2d.p
  document.querySelector(
    ".termly-price"
  ).textContent = `£${totalRepaymentDisplay.toFixed(2)}`;

  // Hide empty result and show completed result
  resultDisplayEmpty.classList.add("no_display");
  resultDisplayCompleted.classList.remove("no_display");
}

// ACTION - calculate mortgage
const calcBtn = document.querySelector(".input__field-submit");
calcBtn.onclick = () => {
  const allInputsValid = checkInputs();
  if (allInputsValid) {
    calculateMortgage();
  }
};

// params to handle error
const inputFieldRadios = document.querySelectorAll(".input__field-radio");
const mortgageAmount = document.querySelector("#text__mort-amount").value;
  const mortgageTerm = document.querySelector("#text__mort-term").value;
  const interestRate = document.querySelector("#text__mort-rate").value;
  const mortgageType = document.querySelector(".radio-btn:checked");

  const mortAmountText = document.querySelector("#text__mort-amount");
  const mortAmountIcon = document.querySelector("#icon__mort-amount");
  const mortAmountErr = document.querySelector(".amount_err");

  const mortTermText = document.querySelector("#text__mort-term");
  const mortTermIcon = document.querySelector("#icon__mort-term");
  const mortTermErr = document.querySelector(".term_err");

  const mortRateText = document.querySelector("#text__mort-rate");
  const mortRateIcon = document.querySelector("#icon__mort-rate");
  const mortRateErr = document.querySelector(".rate_err");

  const mortTypeErr = document.querySelector(".type_err");

// FUNCTION - confirm all inputs are filled
function checkInputs() {
  // check all inputs
  if (
    !mortgageAmount ||
    isNaN(mortgageAmount) &&
    !mortgageTerm ||
    isNaN(mortgageTerm) &&
    !interestRate ||
    isNaN(interestRate) &&
    !mortgageType
  ) {
    console.log('mortgageAmount: ', mortgageAmount)
    console.log('mortgageTerm: ', mortgageTerm)
    console.log('interestRate: ', interestRate)
    
    alert(`fill all fields`);
    mortAmountErr.classList.remove("no_display");
    mortAmountErr.classList.add("span");
    mortAmountText.classList.add("text-error");
    mortAmountIcon.classList.add("icon-error");

    mortTermErr.classList.remove("no_display");
    mortTermErr.classList.add("span");
    mortTermText.classList.add("text-error");
    mortTermIcon.classList.add("icon-error");

    mortRateErr.classList.remove("no_display");
    mortRateErr.classList.add("span");
    mortRateText.classList.add("text-error");
    mortRateIcon.classList.add("icon-error");
    return false;
  }

  // check for each inputs
  // mortgageAmount
  if (!mortgageAmount || isNaN(mortgageAmount)) {
    console.log(`helpaaaaa`);
    mortAmountErr.classList.remove("no_display");
    mortAmountErr.classList.add("span");
    mortAmountText.classList.add("text-error");
    mortAmountIcon.classList.add("icon-error");
  }

  // mortgageTerm
  if (!mortgageTerm || isNaN(mortgageTerm)) {
    console.log(`yo-yo!`);
    mortTermErr.classList.remove("no_display");
    mortTermErr.classList.add("span");
    mortTermText.classList.add("text-error");
    mortTermIcon.classList.add("icon-error");
  }

  // interestRate
  if (!interestRate || isNaN(interestRate)) {
    console.log(`yo-yo!`);
    mortRateErr.classList.remove("no_display");
    mortRateErr.classList.add("span");
    mortRateText.classList.add("text-error");
    mortRateIcon.classList.add("icon-error");
  }

  // mortgageType
  if (!mortgageType) {
    console.log(`yo-yo!`);
    mortTypeErr.classList.remove("no_display");
    mortTypeErr.classList.add("span");
    // mortTypeText.classList.add("text-error");
    // mortTypeIcon.classList.add("icon-error");

    // to remove prompt message when error is rectified
    mortTypeText.addEventListener("input", () => {
      if (mortTypeErr.classList.contains("span")) {
        mortTypeErr.classList.add("no_display");
        mortTypeErr.classList.remove("span");
        mortTypeText.classList.remove("text-error");
        mortTypeIcon.classList.remove("icon-error");
      }
    });
  }
  return true;
}

// params for states
const inputFieldTexts = document.querySelectorAll(".input__field-text");
const inputFieldIcons = document.querySelectorAll(".input__field-icon");

// FUNCTION - active states
// other input types
inputFieldTexts.forEach((text, index) => {
  let icon = inputFieldIcons[index];

  text.addEventListener("focus", () => {
    text.classList.add("text-active");
    icon.classList.add("icon-active");
  });

  text.addEventListener("focusout", () => {
    text.classList.remove("text-active");
    icon.classList.remove("icon-active");
  });
});
// radios
inputFieldRadios.forEach((x) => {
  x.addEventListener("click", () => {
    x.classList.add("field-active");
  });

  x.addEventListener("focusout", () => {
    x.classList.remove("field-active");
  });
});

// FUNCTION - hide result
function hideResult() {
  resultDisplayEmpty.classList.remove("no_display");
  resultDisplayCompleted.classList.add("no_display");
}
// FUNCTION - show result
function showResult() {
  resultDisplayEmpty.classList.add("no_display");
  resultDisplayCompleted.classList.remove("no_display");
}

// listeners for user input
//   // to remove prompt message when error is rectified

// AMOUNT
  mortAmountText.addEventListener("input", () => {
    if (mortAmountErr.classList.contains("span")) {
      mortAmountErr.classList.add("no_display");
      mortAmountErr.classList.remove("span");
      mortAmountText.classList.remove("text-error");
      mortAmountIcon.classList.remove("icon-error");
    }
  });

// TERM
  mortTermText.addEventListener("input", () => {
    if (mortTermErr.classList.contains("span")) {
      mortTermErr.classList.add("no_display");
      mortTermErr.classList.remove("span");
      mortTermText.classList.remove("text-error");
      mortTermIcon.classList.remove("icon-error");
    }
  });

// RATE
  mortRateText.addEventListener("input", () => {
    if (mortRateErr.classList.contains("span")) {
      mortRateErr.classList.add("no_display");
      mortRateErr.classList.remove("span");
      mortRateText.classList.remove("text-error");
      mortRateIcon.classList.remove("icon-error");
    }
  });

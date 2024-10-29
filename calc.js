"use strict";

const calC = document.querySelector("html");

// RESET FORM
const clearBtn = document.querySelector(".clear");
const calcInputs = document.querySelectorAll(".user-input");
const errorMessages = document.querySelectorAll(".calc__inputs span");

clearBtn.onclick = function () {
  // console.log("i was clicked");

  calcInputs.forEach((calcInput) => {
    calcInput.value = "";
    radioButtons.forEach((radioBtn, index) => {
      radioBtn.checked = false;
      const field = inputFieldRadios[index];
      field.classList.remove("field-error");
    });
    inputFieldTexts.forEach((text, index) => {
      const icon = inputFieldIcons[index];

      text.classList.remove("text-error");
      icon.classList.remove("icon-error");
    });
  });

  // Hide completed result and show empty result
  resultDisplayEmpty.classList.remove("no_display");
  resultDisplayCompleted.classList.add("no_display");

  //   clear errors
  const errorMessages = document.querySelectorAll(".calc__inputs span");
  errorMessages.forEach((errMsg) => {
    errMsg.classList.remove("error");
    errMsg.classList.add("span");
  });
};

// ACTIVE STATES
const inputFields = document.querySelectorAll(".input__field-group");
const inputFieldTexts = document.querySelectorAll(".input__field-text");
const inputFieldIcons = document.querySelectorAll(".input__field-icon");
const inputFieldRadios = document.querySelectorAll(".input__field-radio");
let radioButtons = document.querySelectorAll(".radio-btn");

// INPUT FIELDS ACTIVE
// text inputs
inputFieldTexts.forEach((text, index) => {
  const icon = inputFieldIcons[index];

  text.addEventListener("focus", () => {
    text.classList.add("text-active");
    icon.classList.add("icon-active");
  });

  text.addEventListener("blur", () => {
    text.classList.remove("text-active");
    icon.classList.remove("icon-active");
  });
});
// radio inputs
radioButtons.forEach((btn, index) => {
  const field = inputFieldRadios[index];

  btn.addEventListener("click", () => {
    field.classList.add("field-active");
  });
  btn.addEventListener("blur", () => {
    field.classList.remove("field-active");
  });
});
// select radio button with respect to the container
inputFieldRadios.forEach((x, index) => {
  let che = radioButtons[index];
  x.addEventListener("click", () => {
    che.checked = true;
    inputFieldRadios[index].classList.add("field-active");
  });

  // click out
  // x.addEventListener("onblur", () => {
  //   inputFieldRadios[index].classList.remove("field-active");
  //   console.log(`removed`);
  // });
});

// SUBMIT FORM
const submitButton = document.querySelector(".submit-btn");
const resultDisplayEmpty = document.querySelector(".result__display-empty");
const resultDisplayCompleted = document.querySelector(
  ".result__display-completed"
);

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

submitButton.addEventListener("click", (form) => {
  form.preventDefault();

  const mortgageAmount = document.querySelector("#amount .user-input").value;
  const mortgageTerm = document.querySelector("#term .user-input").value;
  const interestRate = document.querySelector("#rate .user-input").value;
  const mortgageType = document.querySelector('input[type="radio"]:checked');
  // Confirm all fields are filled
  if (
    !mortgageAmount ||
    isNaN(mortgageAmount) ||
    !mortgageTerm ||
    isNaN(mortgageTerm) ||
    !interestRate ||
    isNaN(interestRate) ||
    !mortgageType
  ) {
    // Individual Checks
    // AMOUNT
    if (!mortgageAmount || isNaN(mortgageAmount)) {
      mortAmountText.classList.add("text-error");
      mortAmountIcon.classList.add("icon-error");
      mortAmountErr.classList.remove("span");
    } else {
      mortAmountText.classList.remove("text-error");
      mortAmountIcon.classList.remove("icon-error");
      mortAmountErr.classList.add("span");
    }
    // TERM
    if (!mortgageTerm || isNaN(mortgageTerm)) {
      mortTermText.classList.add("text-error");
      mortTermIcon.classList.add("icon-error");
      mortTermErr.classList.remove("span");
    } else {
      mortTermText.classList.remove("text-error");
      mortTermIcon.classList.remove("icon-error");
      mortTermErr.classList.add("span");
    }
    // RATE
    if (!interestRate || isNaN(interestRate)) {
      mortRateText.classList.add("text-error");
      mortRateIcon.classList.add("icon-error");
      mortRateErr.classList.remove("span");
    } else {
      mortRateText.classList.remove("text-error");
      mortRateIcon.classList.remove("icon-error");
      mortRateErr.classList.add("span");
    }
    // TYPE
      if (!mortgageType) {
        radioButtons.forEach((btn, index) => {
          const field = inputFieldRadios[index];
            field.classList.add("field-error");
        });
        mortTypeErr.classList.remove("span");
      } else {
        field.classList.remove("field-error");
        mortTypeErr.classList.add("span");
      }
    }

    // COMPUTATIONS
    const amount = parseFloat(mortgageAmount);
    const term = parseFloat(mortgageTerm);
    const rate = parseFloat(interestRate) / 100;

    // calculate total repayment and interest amounts
    const totalInterestRepayment = amount * rate;
    const totalAmountRepayment = amount + totalInterestRepayment;

    // calculate monthly payments
    const monthlyAmountRepayment = totalAmountRepayment / (term * 12); // Total payment including interest
    const monthlyInterest = totalInterestRepayment / (term * 12); // Interest-only payment

    let monthlyPayment;
    let totalRepaymentDisplay;
    if (mortgageType.value === "repayment") {
      monthlyPayment = monthlyAmountRepayment;
      totalRepaymentDisplay = totalAmountRepayment;
    } else if (mortgageType.value === "interest-only") {
      monthlyPayment = monthlyInterest; // Interest-only payment
      totalRepaymentDisplay = totalInterestRepayment;
    }

    //  Display - AFTER COMPUTATION
    document.querySelector(
      ".monthly-price"
    ).textContent = `£${monthlyPayment.toFixed(2)}`; //to 2d.p
    document.querySelector(
      ".termly-price"
    ).textContent = `£${totalRepaymentDisplay.toFixed(2)}`;

    // Hide empty result and show completed result
    resultDisplayEmpty.classList.add("no_display");
    resultDisplayCompleted.classList.remove("no_display");
});

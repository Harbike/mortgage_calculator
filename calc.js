const calC = document.querySelector("html");

// RESET FORM
const clearBtn = document.querySelector(".clear");
const calcInputs = document.querySelectorAll(".user-input");

clearBtn.onclick = function () {
  console.log("i was clicked");

  calcInputs.forEach((calcInput) => {
    calcInput.value = "";
    radioButtons.forEach((radioBtn) => {
      radioBtn.checked = false;
    });
  });
  // Hide completed result and show empty result
  resultDisplayEmpty.classList.remove("no_display");
  resultDisplayCompleted.classList.add("no_display");
};

// Active states
const inputFields = document.querySelectorAll(".input__field-group");
const inputFieldTexts = document.querySelectorAll(".input__field-text");
const inputFieldIcons = document.querySelectorAll(".input__field-icon");
const inputFieldRadios = document.querySelectorAll(".input__field-radio");
const radioButtons = document.querySelectorAll(".radio-btn");

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

// INPUT FIELDS ERROR
// text inputs
// inputFieldTexts.forEach((text, index) => {
//     const icon = inputFieldIcons[index];

//     text.addEventListener("focus", () => {
//       text.classList.add("text-active");
//       icon.classList.add("icon-active");
//     });

//     text.addEventListener("blur", () => {
//       text.classList.remove("text-active");
//       icon.classList.remove("icon-active");
//     });
//   });
//   // radio inputs
//   radioButtons.forEach((btn, index) => {
//     const field = inputFieldRadios[index];

//     btn.addEventListener("click", () => {
//       field.classList.add("field-active");
//     });
//     btn.addEventListener("blur", () => {
//       field.classList.remove("field-active");
//     });
//   });

// SUBMIT FORM
const submitButton = document.querySelector(".submit-btn");
const resultDisplayEmpty = document.querySelector(".result__display-empty");
const resultDisplayCompleted = document.querySelector(
  ".result__display-completed"
);

submitButton.addEventListener("click", (form) => {
  form.preventDefault();

  const mortgageAmount = document.querySelector("#amount .user-input").value;
  const mortgageTerm = document.querySelector("#term .user-input").value;
  const interestRate = document.querySelector("#rate .user-input").value;
  const mortgageType = document.querySelector('input[type="radio"]:checked');

  // Confirm all fields are filled
  if (!mortgageAmount || !mortgageTerm || !interestRate || !mortgageType) {
    alert("Fill the missing fields");
    return;
  }

  // COMPUTATIONS
  const amount = parseFloat(mortgageAmount);
  const term = parseFloat(mortgageTerm);
  const rate = parseFloat(interestRate) / 100;

//   calculate total repayment and interest amounts
  const totalInterestRepayment = amount * rate;
  const totalAmountRepayment = amount + totalInterestRepayment;

//   calculate monthly payments
  const monthlyAmountRepayment = totalAmountRepayment / (term * 12); // Total payment including interest
  const monthlyInterest = totalInterestRepayment / (term * 12); // Interest-only payment

    let monthlyPayment;
    let totalRepaymentDisplay;
  if (mortgageType.value === "repayment") {
    monthlyPayment = monthlyAmountRepayment;
    totalRepaymentDisplay = totalAmountRepayment;
  } else {
    monthlyPayment = monthlyInterest; // Interest-only payment
    totalRepaymentDisplay = totalInterestRepayment;
  }

//    Display - AFTER COMPUTATION
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

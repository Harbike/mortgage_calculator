const calC = document.querySelector('html');

// reset form
const clearBtn = document.querySelector(".clear");
const calcInputs = document.querySelectorAll(".user-input");

clearBtn.onclick = function() {
    console.log('i was clicked');
    
    calcInputs.forEach(calcInput => {
        calcInput.value = '';
        radioButtons.forEach(radioBtn => {
            radioBtn.checked = false;
        })
    })
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

    text.addEventListener('focus', () => {
        text.classList.add('text-active');
        icon.classList.add('icon-active');
    });

    text.addEventListener('blur', () => {
        text.classList.remove('text-active');
        icon.classList.remove('icon-active');
    });
});
// radio inputs
radioButtons.forEach((btn, index) => {
    const field = inputFieldRadios[index];

    btn.addEventListener('click', ()=>{
        field.classList.add('field-active');
    })
    btn.addEventListener('blur', ()=>{
        field.classList.remove('field-active');
    })
 
});

// submit form

  const submitButton = document.querySelector(".submit-btn");
  const resultDisplayEmpty = document.querySelector(".result__display-empty");
  const resultDisplayCompleted = document.querySelector(".result__display-completed");
  
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

    // Computations
    const amount = parseFloat(mortgageAmount);
    const term = parseFloat(mortgageTerm);
    const rate = parseFloat(interestRate) / 100;
    const monthRate = rate / 12;

    // Calculate monthly payment
    let monthlyPayment;
    if (mortgageType.value === "repayment") {
      const numPayments = term * 12;
      monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -numPayments));
    } else {
      monthlyPayment = (amount * rate); // Interest-only payment
    }

    const totalRepayment = monthlyPayment * term * 12;

    // Display - AFTER COMPUTATION
    document.querySelector(".monthly-price").textContent = `£${monthlyPayment.toFixed(2)}`; //to 2d.p
    document.querySelector(".termly-price").textContent = `£${totalRepayment.toFixed(2)}`; 

    // Hide empty result and show completed result
    resultDisplayEmpty.classList.add("no_display");
    resultDisplayCompleted.classList.remove("no_display");
  });



























// const submitBtn = document.querySelectorAll('.input__field-submit')
// resultDisplay.forEach(dispaly=>{
//     submitBtn.addEventListener('click', ()=>{
//         resultDisplay.classList.toggle('no-display')
//     })
// })

// SUBMIT
// submitBtn.addEventListener('click', () =>{
//     console.log('you clicked');
    
//     let allFilled = true;
//     inputFieldTexts.forEach((response) =>{
//         if (response.value.trim() === ' ') {
//     allFilled = false;
// }
// });

// if (!allFilled) {
//     alert('Please fill all fields'); // Display error message
//     resultDisplayCompleted.classList.add('no_display');
//     resultDisplayEmpty.classList.remove('no_display');
// } else {
//     resultDisplayCompleted.classList.remove('no_display');
//     resultDisplayEmpty.classList.add('no_display');
// }
// });


    //         alert('Please fill all fields'); //field displays error message
    //         resultDisplayCompleted.classList.add('no_display');
    //         resultDisplayEmpty.classList.remove('no_display');
    //     } else {
    //         resultDisplayCompleted.classList.remove('no_display');
    //         resultDisplayEmpty.classList.add('no_display');
    //     }
    // })
    // resultDisplay.forEach(result => {
    //     if (result.classList.contains('no_display')){
    //         result.classList.remove('no_display');
    //     }
    //     else {
    //         result.classList.add('no_display');
    //     }
    // })
// })

// const inFields = document.querySelectorAll('input[type="text"],input[type="radio"]'); // Adjust the selector as needed

// submitBtn.addEventListener('click', () => {
//     let allFilled = true;

//     inFields.forEach((input) => {
//         if (input.value.trim() === '') {
//             allFilled = false;
//         }
//     });

//     if (!allFilled) {
//         alert('Please fill all fields'); // Display error message
//         resultDisplayCompleted.classList.add('no_display');
//         resultDisplayEmpty.classList.remove('no_display');
//     } else {
//         resultDisplayCompleted.classList.remove('no_display');
//         resultDisplayEmpty.classList.add('no_display');
//     }
// });






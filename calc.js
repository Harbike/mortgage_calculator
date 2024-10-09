const calC = document.querySelector('html');


// reset form
const clearBtn = document.querySelector(".clear");
const calcForm = document.querySelector(".form-to_clear");

clearBtn.onclick = function() {
    calcForm.reset();
  };

// Active states
const inputFields = document.querySelectorAll(".input__field-group");
const inputFieldTexts = document.querySelectorAll(".input__field-text");
const inputFieldIcons = document.querySelectorAll(".input__field-icon");
const inputFieldRadios = document.querySelectorAll(".input__field-radio");
const radioButtons = document.querySelectorAll(".radio-btn");

// INPUT FIELDS
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
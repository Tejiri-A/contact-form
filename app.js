const form = document.querySelector("form");
const inputTexts = document.querySelectorAll("input[type='text']");
const email = document.getElementById("emailAddress");
const message = document.querySelector("textarea");
const radioBtns = document.querySelectorAll("input[type='radio']");
const checkBox = document.querySelector("input[type='checkbox']");
const root = document.querySelector(":root");
const rootStyles = getComputedStyle(root);
const red = rootStyles.getPropertyValue("--color-red");
const green600 = rootStyles.getPropertyValue("--color-green-600");

// function textFieldValidation(){
//     inputTexts.forEach((inputText) => {
//         if (inputText.value.trim() === " ") {
//             inputText.nextElementSibling.style.display = 'block'
//             return false
//         }
//         else{
//             return true
//         }
//     })
// }

function textFieldValidation() {
  const inputTexts = Array.from(
    document.querySelectorAll("input[type='text']")
  );
  let isInputFieldOccupied = false;

  inputTexts.forEach((inputText) => {
    if (inputText.value.trim() === "") {
      inputText.style.borderColor = red;
      inputText.nextElementSibling.style.display = "block"; // Show error message
    } else {
      inputText.style.borderColor = green600;
      inputText.nextElementSibling.style.display = "none"; // Hide error message (optional)
      isInputFieldOccupied = true;
    }
  });

  return isInputFieldOccupied;
}

function textAreaValidation() {
  if (message.value.trim() === "") {
    message.style.borderColor = red;
    message.nextElementSibling.style.display = "block";
    return false;
  } else {
    message.style.borderColor = green600;
    message.nextElementSibling.style.display = "none";
    return true;
  }
}

function emailValidation(email) {
  const regex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  if (email.value.trim() === "") {
    email.style.borderColor = red;
    email.nextElementSibling.style.display = "block";
    return false;
  } else if (email.value.trim() !== "" && !regex.test(email.value)) {
    email.style.borderColor = red;
    email.nextElementSibling.textContent = "Please enter a valid email address";
    email.nextElementSibling.style.display = "block";
    return false;
  } else {
    email.style.borderColor = green600;
    email.nextElementSibling.style.display = "none";
    return true;
  }
}

function checkBoxValidation() {
  let isChecked = false;

  radioBtns.forEach((radioBtn) => {
    if (radioBtn.checked) {
      isChecked = true;
    }
  });
  const radioBtnContainer = document.querySelector(".contact__radio-group");
  const radioBoxes = radioBtnContainer.querySelectorAll(
    ".contact__radio-label"
  );
  const errorMessage = radioBtnContainer.querySelector(
    ".contact__field-warning"
  );
  if (!isChecked) {
    errorMessage.style.display = "block";
    radioBoxes.forEach((radioBox) => {
      radioBox.style.borderColor = red;
    });
    return false;
  } else {
    errorMessage.style.display = "none";
    radioBoxes.forEach((radioBox) => {
      radioBox.style.borderColor = green600;
    });
    return true;
  }
}

function consentValidation() {
  let isChecked = false;

  if (checkBox.checked) {
    isChecked = true;
  }
  if (!isChecked) {
    checkBox.style.borderColor = red;
    checkBox.parentElement.nextElementSibling.style.display = "block";
    return false;
  } else {
    checkBox.style.borderColor = green600;
    checkBox.parentElement.nextElementSibling.style.display = "none";
    return true;
  }
}


form.addEventListener("submit", (e) => {
  // Prevent default form submission
  e.preventDefault();

  // Perform all validations
  let allValid = true; // Flag to track overall validation status

  if (!textFieldValidation(inputTexts)) {
    allValid = false; // Mark some validation failed
  }

  if (!emailValidation(email)) {
    allValid = false; // Mark some validation failed
  }

  if (!textAreaValidation()) {
    allValid = false; // Mark some validation failed
  }

  if (!checkBoxValidation()) {
    allValid = false; // Mark some validation failed
  }

  if (!consentValidation()) {
    allValid = false; // Mark some validation failed
  }

  if (allValid) {
    // All validations passed, submit the form or perform other actions
    alert("Successful submission!");
  } else {
    // At least one validation failed, display an error message or prevent further actions
    alert("Please fix the highlighted errors before submitting.");
  }
});

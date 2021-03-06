// Create or add an account - get the account type and return success message in a modal
const selected = document.getElementById("account-type");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalContent = document.getElementById("account-modal-content");
const para = document.createElement("P");
let text;

// Account Credit & Debit forms
const debitForm = document.getElementById("accnt-debit-form");
const creditForm = document.getElementById("accnt-credit-form");

const confirmDeleteMsg = document.getElementById("confirm-delete");

// Change account status -deactivate or activte a bank account
const badge = document.getElementById("accnt-badge");
const accountStatusBtn = document.getElementById("accnt-status-btn");

const handleStatusChange = () => {
  if (badge.innerHTML === "Active" && badge.classList[0] === "badge-active") {
    badge.classList.replace("badge-active", "badge-inactive");
    badge.innerHTML = "Inactive";
    accountStatusBtn.innerText = "Activate Account";
  } else {
    badge.classList.replace("badge-inactive", "badge-active");
    badge.innerHTML = "Active";
    accountStatusBtn.innerText = "Deactivate Account";
  }
};

const handleAccountSubmit = e => {
  para.innerHTML = "";
  if (selected.value !== "") {
    text = document.createTextNode(`${selected.value} account created`);
  } else {
    text = document.createTextNode(`No account selected`);
  }

  para.appendChild(text);
  modalContent.appendChild(para);
  modal.style.display = "block";
};

// Function to debit account
const handleAccountDebit = () => {
  // clear form area before displaying
  confirmDeleteMsg.style.display = "none";
  creditForm.style.display = "none";
  debitForm.style.display = "block";
  modal.style.display = "block";
};

// function to credit account
const handleAccountCredit = () => {
  confirmDeleteMsg.style.display = "none";
  debitForm.style.display = "none";
  creditForm.style.display = "block";
  modal.style.display = "block";
};

const handleAccountDelete = () => {
  debitForm.style.display = "none";
  creditForm.style.display = "none";
  confirmDeleteMsg.style.display = "block";
  modal.style.display = "block";
};

span.onclick = () => {
  modal.style.display = "none";
};

window.onclick = event => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

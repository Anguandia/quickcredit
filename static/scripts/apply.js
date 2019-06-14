/* eslint-disable linebreak-style */
// loan application page
const user = document.getElementById('users').value;
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<h1 class='loanform'>Loan appliction form</h1><hr>\
<div id='main_main'>\
<form id='loanform' action='' onmouseenter='showTip(this, "edit or verify the default values", "-10%")'>\
  <fieldset class='loanform' name='personal'>\
    <legend>Personal details</legend>
    <label class='loan_app'>Email<span>*</span>\
    <input type='text' id='client' name='client' placeholder='email' autofocus oninvalid='this.setCustomValidity("email is required")' required></input>\
    </label>\
    <label class='loan_app'>Full Name\
      <input type='text' id='fullname' name='fullname' placeholder='full name'></input>\
    </label>\
  </fieldset><br>\
  <fieldset class='loanform' name='address'>\
    <legend>Addresses</legend>\
    <fieldset id='work'>\
      <legend>Work Address</legend>\
        <label class='loan_app'>District<span>*</span>\
          <input type='text' name='work' placeholder='district' oninvalid='this.setCustomValidity("district is required")' required></input>\
        </label>\
        <label class='loan_app'>Town<span>*</span>\
          <input type='text' name='work' placeholder='town or municipality' oninvalid='this.setCustomValidity("town is required")' required></input>\
        </label><br>\
        <label class='loan_app'>Street<span>*</span>\
          <input type='text' name='work' placeholder='street' oninvalid='this.setCustomValidity("street is required")' required></input>\
        </label>\
        <label class='loan_app'>Block\
          <input type='text' name='work' id='work_residence_block' placeholder='block'></input>\
        </label>\
    </fieldset><br>\
    <fieldset id='residence'>\
      <legend>Residential Address</legend>\
        <label class='loan_app'>District<span>*</span>\
          <input type='text' name='residence' placeholder='district' oninvalid='this.setCustomValidity("district is required")' required></input>\
        </label>\
        <label class='loan_app'>Town<span>*</span>\
          <input type='text' name='residence' placeholder='town' oninvalid='this.setCustomValidity("town is required")' required></input>\
        </label><br>\
        <label class='loan_app'>Street<span>*</span>\
          <input type='text' name='residence' placeholder='street' oninvalid='this.setCustomValidity("street is required")' required></input>\
        </label>\
        <label class='loan_app'>Block\
          <input type='text' name='residence' placeholder='block'></input>\
        </label>\
    </fieldset><br>\
    <fieldset id='home'>\
      <legend>Permanent Address</legend>\
      <label class='loan_app'>District<span>*</span>\
        <input type='text' name='home' placeholder='district' oninvalid='this.setCustomValidity("district is required")' required></input>\
      </label>\
      <label class='loan_app'>Town<span>*</span>\
        <input type='text' name='home' placeholder='town' oninvalid='this.setCustomValidity("town is required")' required></input>\
      </label><br>\
      <label class='loan_app'>Street<span>*</span>\
        <input type='text' name='home' placeholder='street' oninvalid='this.setCustomValidity("street is required")' required></input>\
      </label>\
      <label class='loan_app'>Block\
        <input type='text' name='home' placeholder='block'></input>\
      </label>\
    </fieldset><br>\
  </fieldset><br>\
  <fieldset class='loanform' name='details'>\
    <legend>Loan Details</legend>\
    <label>Loan Tenor\
      <select id='tenor' name='tenor' oninput='installment()'>\
        <option value=''><a href='#'>--select a loan product--</a></option>\
        <option><a href='#'>3-months</a></option>\
        <option><a href='#'>6-months</a></option>\
        <option><a href='#'>9-months</a></option>\
        <option><a href='#'>12-months</a></option>\
        <option><a href='#'>custom</a></option>\
      </select>\
    </label>\
    <label>Loan Amount(RFK)\
      <input type='text' name='amount' id='amount' placeholder='please enter the amount required' oninput='installment()'>\
    </label>\
    <label>Payment Installment\
      <input type='text' id='monthlyInst' name='paymentinstallment' readonly></input>
    </label>\
    <label>Interest\
      <input type='text' id='interest' name='interest' value='0.5%' readonly></input>
    </label>\
  </fieldset>\
  <label class='hidden'>Interest\
      <input type='text' hidden></input>
  </label>\
  <div id='btns'>\
  <input type='button' id='submit' class='submit' value='Submit' onclick='postLoan()'>\
  <input type='Reset' id='reset' class='submit' value='Reset'>\
  </div>\
</form>\
</div>
<script src='static/scripts/user.js'></script>`;
document.body.appendChild(main);

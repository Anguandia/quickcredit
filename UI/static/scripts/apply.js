// loan application page
document.write(`<!--loan application page-->\
<div id='main'>\
<h1 class='loanform'>Loan appliction form</h1><hr>\
<div id='main_main'>\
<form id='loanform' action='#' onsubmit='approve("application submitted")'>\
  <fieldset class='loanform'>\
    <legend>Personal details</legend>
    <label class='loan_app'>Family Name<span>*</span>\
    <select name='title'>\
    <option>--select title--</option>\
    <option>Mr</option>\
    <option>Mrs</option>\
    <option>Miss</option>\
    <option>Dr</option>\
    </select>\
    <input type='text' name='family_name' id='family_name' placeholder='family name' value=${localStorage.getItem('current user').split(' ')[0]} oninvalid='this.setCustomValidity("sur name is required")'\ required></input>\
    </label>\
    <label class='loan_app'>First Name<span>*</span>\
        <input type='text' name='first_name' id='first' placeholder='first name' value=${localStorage.getItem('current user').split(' ')[1]} oninvalid='this.setCustomValidity("first name is required")' required></input>\
    </label>\
  </fieldset><br>\
  <fieldset class='loanform'>\
    <legend>Addresses</legend>\
    <fieldset>\
      <legend>Work Address</legend>\
        <label class='loan_app'>District<span>*</span>\
          <input type='text' name='work_residence_district' id='work_residence_district' placeholder='district' oninvalid='this.setCustomValidity("district is required")' required></input>\
        </label>\
        <label class='loan_app'>Town<span>*</span>\
          <input type='text' name='work_residence_town' id='work_residence_town' placeholder='town or municipality' oninvalid='this.setCustomValidity("town is required")' required></input>\
        </label><br>\
        <label class='loan_app'>Street<span>*</span>\
          <input type='text' name='work_residence_street' id='work_residence_street' placeholder='street' oninvalid='this.setCustomValidity("street is required")' required></input>\
        </label>\
        <label class='loan_app'>Block\
          <input type='text' name='work_residence_block' id='work_residence_block' placeholder='block'></input>\
        </label>\
    </fieldset><br>\
    <fieldset>\
      <legend>Residential Address</legend>\
        <label class='loan_app'>District<span>*</span>\
          <input type='text' name='residence_district' id='residence_district' placeholder='district' oninvalid='this.setCustomValidity("district is required")' required></input>\
        </label>\
        <label class='loan_app'>Town<span>*</span>\
          <input type='text' name='residence_town' id='residence_town' placeholder='town' oninvalid='this.setCustomValidity("town is required")' required></input>\
        </label><br>\
        <label class='loan_app'>Street<span>*</span>\
          <input type='text' name='residence_street' id='residence_street' placeholder='street' oninvalid='this.setCustomValidity("street is required")' required></input>\
        </label>\
        <label class='loan_app'>Block\
          <input type='text' name='residence_block' id='residence_block' placeholder='block'></input>\
        </label>\
    </fieldset><br>\
    <fieldset>\
      <legend>Permanent Address</legend>\
      <label class='loan_app'>District<span>*</span>\
        <input type='text' name='permanent_district' id='permanent_district' placeholder='district' oninvalid='this.setCustomValidity("district is required")' required></input>\
      </label>\
      <label class='loan_app'>Town<span>*</span>\
        <input type='text' name='permanent_town' id='permanent_town' placeholder='town' oninvalid='this.setCustomValidity("town is required")' required></input>\
      </label><br>\
      <label class='loan_app'>Street<span>*</span>\
        <input type='text' name='permanent_street' id='permanent_street' placeholder='street' oninvalid='this.setCustomValidity("street is required")' required></input>\
      </label>\
      <label class='loan_app'>Block\
        <input type='text' name='permanent_block' id='permanent_block' placeholder='block'></input>\
      </label>\
    </fieldset><br>\
  </fieldset><br>\
  <fieldset class='loanform'>\
    <legend>Loan Details</legend>\
    <label>Loan Scheme\
      <select>\
        <option><a href='#'>--select a loan product--</a></option>\
        <option><a href='#'>6-months</a></option>\
        <option><a href='#'>12-months</a></option>\
        <option><a href='#'>24-months</a></option>\
        <option><a href='#'>60-months</a></option>\
        <option><a href='#'>custom</a></option>\
      </select>\
    </label>\
    <label>Loan Amount(RFK)\
      <input type='text' placeholder='please enter the amount required'>\
    </label>\
    <label>Payment Options\
      <select>\
        <option><a href='#'>--select a loan product--</a></option>\
        <option><a href='#'>6-months</a></option>\
        <option><a href='#'>12-months</a></option>\
        <option><a href='#'>24-months</a></option>\
        <option><a href='#'>60-months</a></option>\
        <option><a href='#'>custom</a></option>\
      </select>\
    </label>\
  </fieldset>\
  <div id='btns'>\
  <input type='submit' id='submit' class='submit' value='Submit'>\
  <input type='Reset' id='reset' class='submit' value='Reset'>\
  </div>\
</form>\
</div>\
<script src='static/scripts/user.js'></script>
</div>\
`);

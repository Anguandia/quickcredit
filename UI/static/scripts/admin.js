// loan application page
document.write(
    `<div id="main">\
    <h1 id='username'>${localStorage.getItem('current user')}</h1><hr>\
    <div id="main_main">\
    <input type="text" name="loan" class="searchbox" onkeyup="filterData(1)"\
    placeholder="enter loan id to search">\
    <tab class="search"><a href="loan.html">Select</a></tab>\
    <div id="controls">\
      <label>Search for:
      <select onchange='selectSearch(event)'>\
      <option>--select--</option>\
      <option>User by Id</option>\
      <option>User by Name</option>\
      <option>Loan by Id</option>\
      <option>Loan by Name</option>\
      <option>Loan by Status</option>\
      </select>\
      </label>
    </div><hr>\
    <button class='dashboard _yellow green' id='new_user' onclick="loadSelection('Not Verified',  'New Users')"><p>*New Users<span>10</span></p></button>\
    <button class='dashboard _lightgreen navy' id='Draft' onclick='loadSelection("Draft","", "?a_loan_180524=View_loan")'><p>*New loans<span>6</span></p></button>\
    <button class='dashboard _lightblue navy' id='Verified' onclick='loadSelection("Verified","","?a_loan_180524=View_loan")'><p>Pending Approval<span>11</span></p></button>\
    <button class='dashboard _aliceblue' id='Approved' onclick='loadSelection("Approved", "","?a_loan_180524=View_loan")'><p>Pending Credit<span>18</span></p></button>\
    <button class='dashboard _yellow red' id='Rejected' onclick='loadSelection("Rejected", "","?a_loan_180524=View_loan")'><p>Rejected loan applications<span>10</span></p></button>\
    <button class='dashboard _navy white' id='Current' onclick='loadSelection("Current", "","?a_loan_180524=view_loan")'><p>Running loans<span>10</span></p></button>\
    <button class='dashboard _red white' id='Overdue' onclick='loadSelection("Overdue", "","?a_loan_180524=view_loan")'><p>Loans overdue<span>10</span></p></button>\
    <button class='dashboard _green white' id='Completed' onclick='loadSelection("Completed", "","?a_loan_180524=view_loan")'><p>Completed<span>10</span></p></button>\
    </div>\
    <script src='static/scripts/user.js'></script>\
    </div>\
    `);

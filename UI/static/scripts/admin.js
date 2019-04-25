// loan application page
document.write(
    `<div id="main">\
    <h1 id='username'>Admin Mike</h1><hr>\
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
    <button class='dashboard _yellow green' id='new_user' onclick='loadSelection()'><p>*New Users<span>10</span></p></button>\
    <button class='dashboard _lightgreen navy' id='Draft' onclick='loadSelection("Draft")'><p>*New loans<span>6</span></p></button>\
    <button class='dashboard _lightblue navy' id='Verified' onclick='loadSelection("Verified")'><p>Pending Approval<span>11</span></p></button>\
    <button class='dashboard _aliceblue' id='Approved' onclick='loadSelection("Approved")'><p>Pending Credit<span>18</span></p></button>\
    <button class='dashboard _yellow red' id='Rejected' onclick='loadSelection("Rejected")'><p>Rejected loan applications<span>10</span></p></button>\
    <button class='dashboard _navy white' id='Current' onclick='loadSelection("Current")'><p>Running loans<span>10</span></p></button>\
    <button class='dashboard _red white' id='Overdue' onclick='loadSelection("Overdue")'><p>Loans overdue<span>10</span></p></button>\
    <button class='dashboard _green white' id='Completed' onclick='loadSelection("Resolved")'><p>Completed<span>10</span></p></button>\
    </div>\
    <script src='static/scripts/user.js'></script>\
    </div>\
    `);

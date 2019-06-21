/* eslint-disable linebreak-style */
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<h1>title loading <span id='title'></span></h1><hr>
<div id='main_main'>
  <h3>Details loading <span id='sub'></span></h3><hr>
  <div id='loandetail'>
    <dl id='applicant' class='hidden'>
      <h4>Client Particulars</h4>
      <div id='pix' class='user admin'>
      <img src='static/images/Penguins.jpg' alt='photo' width='64' height='64'></img>
      </div>
      <dt>Client Id: <span id='id' class='navy'></span></dt>
      <dt>Name: <span id='firstname' class='navy'></span> <span id='lastname' class='navy'></span></dt>
      <dt>Tel: <span id='tel' class='navy'></span></dt>
      <dt>Email: <span id='email'></span></dt>
      <dt>Status: <span id='userstatus'></span></dt>
      <dt>Admin: <span id='isadmin'></span></dt>
    </dl>
    <dl id='address' class='hidden'>
      <h4>Client Address</h4>
      <dt>Business:
      <span id='work'></span>
      </dt>
      <dt>Residence:
      <span id='residence'></span>
      </dt>
      <dt>Permanent:
      <span id='home'></span>
      </dt>
    </dl>
    <dl id='loandetails' class='hidden'>
      <h4>Loan Particulars:</h4>
      <dt>Client: <span id='client' class='navy'></span></dt>
      <dt>Loan Id: <span id='loanid' class='navy'></span></dt>
      <dt>Staus: <span id='status'></span></dt>
      <dt>Credit Amount(USD): <span id='amount'></span></dt>
      <dt>Tenor(Months): <span id='tenor'></span></dt>
      <dt>Interest(%): <span id='interest'></span></dt>
      <dt>Repayment Installment(USD): <span id='paymentinstallment'></span></dt>
      <dt>Loan Value(USD): <span id='value' class='navy'></span></dt>
    </dl>
    <dl id='repayment' class='repayment hidden'>
      <dt class='repayment'> Loan Amount: <span class='navy' id='loanamount'></span></dt>
      <dt class='repayment'> Loan Id: <span class='navy' id='loanId'></span></dt>
      <dt class='repayment'> Monthly Installment: <span id='monthlyinstallment'></span></dt>
      <dt class='repayment'> Paid Amount: <span id='paidamount'></span></dt>
      <dt class='repayment'> Date Paid: <span id='createdon'></span></dt>
      <dt class='repayment'> Balance: <span id='balance'></span></dt>
    </dl>
    <div id='logs' class='hidden'><hr>
      <h3>Transaction log for loan- <em></em></h3><hr>
      <ul id='log' class="list"></ul>
      <p class='debit_loan view_loan' id='tot'>Current Balance: <span id='bal'></span></p>
    </div>
    <form id='action' class='admin hidden' action=''>
      <input name='loanid' id='idloan' hidden></input>
      <label for='amount' class='repayment'> Enter Repayment Amount:
      <input name='amount' id='inst' class='repayment' type='text' placeholder='enter amount to repay'></input>
      </label>
      <label class='verify approve upgrade'> Select Action:
      <select name='status' class='verify approve'>
        <option value=''>--select--</option>
        <option class='verify' value='verified'>Verify</option>
        <option class='approve' value='approved'>Approve</option>
        <option class='approve' value='rejected'>Reject</option>
      </select>
      <select class='upgrade' name='isadmin'> Select Action:
        <option value=''>--select--</option>
        <option class='upgrade' value=true>Admin</option>
        <option class='upgrade' value=false>User</option>
      </select>
      </label>
      <button type='button' class='_green white verify repayment approve upgrade' onclick="update()">Submit</button>
      <button type='reset' class='_yellow red verify repayment approve upgrade'>Cancel</button>
    </form>
  </div>
</div>
<script src='static/scripts/user.js'></script>`;
document.body.appendChild(main);

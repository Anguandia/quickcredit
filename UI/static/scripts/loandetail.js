document.write(`<div id='main'>
<h1></h1><hr>
<div id='main_main'>
  <h3></h3><hr>
  <div id='loandetail'>
    <dl id='applicant' class='universal'>
      <h4>Client Particulars</h4>
      <div id='pic'><img src='static/images/Penguins.jpg' alt='photo' width='64' height='64'></img></div>
      <dt>Client Id: <span>910536</span></dt>
      <dt>Name: <span>${(localStorage.getItem('role')=='Client')?localStorage.getItem('current user'): localStorage.getItem('client')}</span></dt>
      <dt>Born: <span>18/03/1981</span></dt>
      <dt>Tel: <span>+256775225010</span></dt>
      <dt>Email: <span id='email'>${(localStorage.getItem('role')=='Client')?localStorage.getItem('current user').replace(' ', '')+'@gmail.com'.toLowerCase(): localStorage.getItem('email')}</span></dt>
    </dl>
    <dl id='address' class='universal'>
      <h4>Client Address</h4>
      <dt>Business:
      <span>Plot 3, Adumi Rd, Central-Arua</span>
      </dt>
      <dt>Residence:
      <span>Plot 10, Oluko Rd, Muni-Arua</span>
      </dt>
      <dt>Permanent:
      <span>Plot 31, Custom Rd, Vurra-Arua</span>
      </dt>
    </dl>
    <dl id='loandetails' class='debit_loan verify_loan view_loan approve_loan View_loan'>
      <h4>Loan Particulars:</h4>
      <dt>Id: <span id='loanid'>1905024</span></dt>
      <dt>Staus: <span id='status'>${localStorage.getItem('status')}</span></dt>
      <dt>Credit(USD): <span id='cr'>100500</span></dt>
      <dt>Repayment Duration: <span>18 Months</span></dt>
      <dt>Repayment Period: <span>30 Days</span></dt>
      <dt>Repayment Installment(USD): <span>6000</span></dt>
      <dt>Total Amount Due(USD): <span id='value'>108000</span></dt>
    </dl><hr>
    <script src='static/scripts/log.js'></script>
    <div class='admin'>
      <input class='debit_loan' type='text' placeholder='enter amount to debit'></input>
      <button id='rejectuser' class='_red white verify_user' onclick="approve('user verification not done!', 'yellow', 'red')">Reject</button>
      <button id='verify' class='_green white verify_user' onclick="approve('user verified')">Verify</button>
      <button id='reject' class='_red white approve_loan' onclick="approve('loan request rejected', 'red')">Reject</button>
      <button id='approve' class='_green white approve_loan' onclick="approve('loan approved!')">Approve</button>
      <button id='post' class='_green white debit_loan' onclick="debit()">Post Payment</button>
    </div>
  </div>
</div>
<script src='static/scripts/user.js'></script>
</div>`);

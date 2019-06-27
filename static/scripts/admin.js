/* eslint-disable linebreak-style */
// loan application page
const q = val => localStorage.getItem(val);
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<h1 id='username'>${localStorage.getItem('current user')}</h1><hr>\
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
    <button class='dashboard _yellow green'>
      <a href='users.html?path=users?status=unverified' class=green>
        <p>*New Users<span>${q('newUsers')}</span></p>
      </a>
    </button>
    <button class='dashboard _lightgreen navy'>
      <a href='client.html?path=loans?status=pending&repaid=false' class=navy>
        <p>*New loans<span>${q('newLoans')}</span></p>
      </a>
    </button>
    <button class='dashboard _lightblue navy'>
      <a href='client.html?path=loans?status=pending&repaid=false&balance=0' class=navy>
        <p>Pending Approval<span>${q('newLoans')}</span></p>
      </a>
    </button>
    <button class='dashboard _aliceblue'>
      <a href='client.html?path=loans?status=approved&repaid=false&balance=0'>
        <p>Pending Credit<span>${q('pendingCredit')}</span></p>
      </a>
    </button>
    <button class='dashboard _yellow red'>
      <a href='client.html?path=loans?status=rejected' class=red>
        <p>Rejected loan applications<span>${q('rejectedLoans')}</span></p>
      </a>
    </button>
    <button class='dashboard _navy white'>
      <a href='client.html?path=loans?status=approved&repaid=false' class='white'>
        <p>Running loans<span>${q('runningLoans')}</span></p>
      </a>
    </button>
    <button class='dashboard _red white'>
      <a href='client.html?path=loans?status=overdue&repaid=false' class='white'>
        <p>Loans overdue<span>0</span></p>
      </a>
    </button>
    <button class='dashboard _green white'>
      <a href='client.html?path=loans?status=repaid' class='white'>
        <p>Completed<span>${q('completedLoans')}</span></p>
      </a>
    </button>
    </div>`;
document.body.appendChild(main);

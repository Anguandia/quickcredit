document.write(`
<h3 class='user debit_loan view_loan'>Loan Transaction Log - ${localStorage.getItem('role')=='Client'?localStorage.getItem('current user'): 'Anguandia Mike'}</h3><hr class='user debit_loan view_loan'>\
<ul id='log' class="list view_loan debit_loan">\
<li>\
  <span class='blue universal'>Cr:</span>\
  <span>transaction id - 18050630008;</span>\
  <span class='blue universal pay'></span>\
  <span>date: 15/12/2018</span>\
</li>\
<li>\
  <span class='green universal'>Dr:</span>\
  <span>transaction id - 18070230301;</span>\
  <span class='green universal pay'>$01000;</span>\
  <span>date: 30/01/2019</span>\
</li>\
<li>\
  <span class='green universal'>Dr:</span>\
  <span>transaction id - 18070630001;</span>\
  <span class='green universal pay'>$01200;</span>\
  <span>date: 28/02/2019</span>\
</li>\
<li>\
  <span class='green universal'>Dr:</span>\
  <span>transaction id - 18070630001;</span>\
  <span class='green universal pay'>$01000;</span>\
  <span>date: 31/03/2019</span>\
</li>\
</ul>\
<p class='debit_loan view_loan' id='tot'><span>Current Balance: </span><span id='balance'></span></p>
`);

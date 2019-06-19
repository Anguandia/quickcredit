/* eslint-disable linebreak-style */
/* eslint-disable operator-linebreak */
// basic page structure to be reused across all paged
document.body.innerHTML = `<header>\
      <div id='logo'>\
        <img rc='static/images/money.jpg' alt='logo'></img>\
      </div>\
      <div id='motto'>\
        <p>Quick Credit</p><span><em> Inividual soft loans</em></span>\
      </div>\
    </header>\
    <nav id='auth'>\
      <tab class='universal' id='hom'><a href= ${localStorage.getItem('role')=='client'?'home.html':localStorage.getItem('role')=='admin'?'admin.html': 'index.html'}>Home</a></tab>\
      <tab class='index' id='signin'><a href='signin.html?path=auth/signin' class='index'>Signin</a></tab>\
      <tab class='index' id='signup'><a href='signup.html?path=auth/signup'>Signup</a></tab>\
      <tab class='user admin' id='signout' onclick='signout()'><a href='#' id='#' class='user admin'>Signout</a></tab>\
    </nav><hr>\
    <!--sign out dialogue box-->\
    <div id='signoutt'>\
      <p>Signout user ${localStorage.getItem('current user')}?</p>\
      <button id='ok' onclick='reset()'>OK</a></button>\
      <button id='cancel' onclick='cancel()'>Cancel</button>\
    </div>\
    <!--page specific content-->\
    <div id='content'>\
      <!--loan menu-->\
      <div id='menu'>\
        <div id='options' class='universal hidden'>\
          <div id='more' class='universal more'></div>\
          <div class='universal more'></div>\
          <div class='universal more'></div>\
        </div>\
        <a href='missing.html' class='universal' id='info'>Loan info</a>\
        <a href='missing.html' class='universal' id='shemes'>Loan schemes</a>\
        <a href='apply.html' class='user' id='apply'>Apply for loan</a>\
        <a href='loan.html?u_' class='user' id='view'>View repayment history</a>\
        <a href='client.html?path=loans' class='admin' id='loans' onclick='getLoan()'>Loan applications</a>\
        <a href='client.html?path=loans?status=approved&repaid=false' class='admin' id='current'>Current loans</a>\
        <a href='client.html?path=loans?status=repaid&repaid=true' class='admin' id='repaid'>Repaid loans</a>\
        <a href='client.html?path=loans' class='admin' id='details'>Loan details</a>\
        <a href='client.html?path=loans&action=approve' class='admin' id='approve_loan'>Approve loan</a>\
        <a href='client.html?path=loans&action=repayment' class='admin' id='debit_loan'>Debit loan</a>\
        <a href='users.html' class='admin' id='users'>Clients</a>\
        <a href='users.html' class='admin' id='user'>Client Details</a>\
        <a href='users.html?path=users&action=verify' class='admin'>Verify Client</a>\
        <a href='users.html?path=users&action=upgrade' class='admin'>Upgrade user to admin</a>\
      </div>\
      <div id='iconcontainer'>\
      <div class='iconrow'>\
          <div class='icondot'></div>\
          <div class='icondot'></div>\
          <div class='icondot'></div>\
      </div>\
      <div class='iconrow'>\
          <div class='icondot'></div>\
          <div class='icondot'></div>\
          <div class='icondot'></div>\
      </div>\
      <div class='iconrow'>\
          <div class='icondot'></div>\
          <div class='icondot'></div>\
          <div class='icondot'></div>\
      </div>\
      </div>\
      <div id='msg'><p>Success</p></div>\
      <div class='signup signin'><ul id='repeat_error'><span id='cross' onclick='closeErrors(this)
      '>&#10006;</span></ul></div>\
    <footer><span>Quick Credit@2019</span></footer>\
    `;

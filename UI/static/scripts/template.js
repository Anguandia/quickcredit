// basic page structure to be reused across all paged
document.write(
    `<header>\
      <div id='logo'>\
        <img src='#' alt='logo'></img>\
      </div>\
      <div id='motto'>\
        <p>Quick Credit</p><span><em> Inividual soft loans</em></span>\
      </div>\
    </header>\
    <nav id='auth'>\
      <tab class='universal' id='home'><a href= ${localStorage.getItem('role')=='Client'?'home.html':localStorage.getItem('role')=='Admin'?'Admin.html': 'index.html'}>Home</a></tab>\
      <tab class='index' id='signin'><a href='signin.html'>Signin</a></tab>\
      <tab class='index' id='signup'><a href='signup.html'>Signup</a></tab>\
      <tab class='user admin' id='signout' onclick='signout()'><a href='#'>Signout</a></tab>\
    </nav>\
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
        <a href='loans.html?a_loan_180524=View_loan' class='admin' id='loans'>Loan applications</a>\
        <a href='current.html?a_loan_180524=view_loan' class='admin' id='current'>Current loans</a>\
        <a href='repaid.html?a_loan_180524=view_loan' class='admin' id='repaid'>Repaid loans</a>\
        <a href='client.html?a_loan_180524=view_loan' class='admin' id='details'>Loan details</a>\
        <a href='client.html?a_loan_180524=approve_loan' class='admin' id='approve_loan'>Approve loan</a>\
        <a href='client.html?a_loan_180524=debit_loan' class='admin' id='debit_loan'>Debit loan</a>\
        <a href='users.html?a_user_1090524=view_user' class='admin' id='users'>Clients</a>\
        <a href='users.html?a_client_190118=' class='admin' id='user'>Client Details</a>\
        <a href='client.html?a_client_190118=verify_user' class='admin' id='verify_user'>Verify Client</a>\
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
    <footer><span>Quick Credit@2019</span></footer>\
    `);

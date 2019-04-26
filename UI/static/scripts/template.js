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
      <tab class='universal' id='home'><a href='index.html'>Home</a></tab>\
      <tab class='index' id='signin'><a href='signin.html'>Signin</a></tab>\
      <tab class='index' id='signup'><a href='signup.html'>Signup</a></tab>\
      <tab class='user admin' id='signout'><a href='index.html'>Signout</a></tab>\
    </nav>\
    <!--page specific content-->\
    <div id='content'>\
      <!--loan menu-->\
      <div id='menu'>\
        <div id='options' class='universal hidden'>\
          <div id='more' class='universal more'></div>\
          <div class='universal more'></div>\
          <div class='universal more'></div>\
        </div>\
        <a href='info.html' class='universal' id='info'>Loan info</a>\
        <a href='schemes.html' class='universal' id='shemes'>Loan schemes</a>\
        <a href='apply.html' class='user' id='apply'>Apply for loan</a>\
        <a href='loan.html' class='user' id='view'>View repayment history</a>\
        <a href='loans.html' class='admin' id='loans'>Loan applications</a>\
        <a href='current.html' class='admin' id='current'>Current loans</a>\
        <a href='repaid.html' class='admin' id='repaid'>Repaid loans</a>\
        <a href='detail.html' class='admin' id='details'>Loan details</a>\
        <a href='approve.html' class='admin' id='approve'>Approve loan</a>\
        <a href='debit.html' class='admin' id='debit'>Debit loan</a>\
        <a href='users.html' class='admin' id='users'>Clients</a>\
        <a href='user.html' class='admin' id='user'>Client Details</a>\
        <a href='verify.html' class='admin' id='verify'>Verify Client</a>\
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
    <footer><span>Quick Credit@2019</span></footer>\
    `);

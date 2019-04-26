// fragment for writting  heaser and nav bar elements
document.write(`<header>\
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
    <tab class='user admin' id='signout'><a href='signout.html'>Signout</a></tab>\
</nav>\
<div id='menu'>\
  <div id='options' class='universal hidden'>\
    <div id='more' class='universal more'></div>\
    <div class='universal more'></div>\
    <div class='universal more'></div>\
  </div>\
  <a href='info.html' class='menu universal' id='info'>Loan info</a>\
  <a href='schemes.html' class='menu universal' id='shemes'>Loan schemes</a>\
  <a href='apply.html' class='menu user' id='apply'>Apply for loan</a>\
  <a href='loans.html' class='menu admin' id='loans'>Loan Applications</a>\
  <a href='current.html' class='menu admin' id='current'>Current loans</a>\
  <a href='repaid.html' class='menu admin' id='repaid'>Repaid loans</a>\
  <a href='detsils.html' class='menu user admin' id='details'>Loan detsils</a>\
  <a href='approve.html' class='menu admin' id='approve'>Approve loan</a>\
  <a href='debit.html' class='menu admin' id='debit'>Debit loan</a>\
  <a href='users.html' class='menu admin' id='users'>Clients</a>\
  <a href='user.html' class='menu admin' id='user'>Client Details</a>\
  <a href='verify.html' class='menu admin' id='verify'>Verify Client</a>\
</div>\
`);

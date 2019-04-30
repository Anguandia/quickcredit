// the user detail section of user profile pages
document.write(`<!--user profile details-->\
<div id='user_profile' onmouseover='showTip(this, "click on profile picture or account button to change password")'>\
  <div id='picture' class='user admin'>\
    <img src='static/images/Koala.jpg' alt='profile picture' width='100px' height='100px'></img>\
    <p><span id='name'>${localStorage.getItem('current user')}</span></p>\
    <button>Account</button>
  </div>\
</div>`);

// the user detail section of user profile pages
document.write(`<!--user profile details-->\
<div id='user_profile'>\
  <div id='picture' class='user admin' onmouseover='showTip(this, "click on profile picture or account button to change password")'>\
    <img src='static/images/Koala.jpg' alt='profile picture' width='100px' height='100px'></img>\
    <p><span id='name'>${localStorage.getItem('current user')}</span></p>\
    <button id='but' onclick='showForm(this)'>Account</button>
    </div>\
    <form id='account' action='' onsubmit='changePassword()'>
      <input type='text' name='old' placeholder='enter old password' id='old'></input>
      <input type='text' name='new' placeholder='enter new password' id='new'></input>
      <button type='submit'>Sumbit</button>
      <span class='error'>Old password wrong</span>
    </form>
</div>`);

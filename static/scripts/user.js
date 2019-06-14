/* eslint-disable linebreak-style */
// the user detail section of user profile pages
const current = document.createElement('div');
current.setAttribute('id', 'user_profile');
current.innerHTML = `<div id='picture' class='user admin' onmouseover='showTip(this, "click on profile picture or account button to change password")'>\
    <img src='static/images/Koala.jpg' alt='profile picture' width='100px' height='100px' id='img'></img>\
    <p><span id='name'>${localStorage.getItem('current user')}</span></p>\
    <div id=usr-controls>
    <button id='but' class='uzr' onclick='showForm("account")'>Change Password</button>
    <button id='pix' class='uzr' onclick='showForm("pic")'>Change Picture</button>
    </div>
    </div>\
    <form id='account' action='' onsubmit='changePassword()'>\
      <input type='text' name='old' placeholder='enter old password' id='old'></input>\
      <input type='text' name='new' placeholder='enter new password' id='new'></input>\
      <button type='submit'>Sumbit</button>\
      <span class='error'>Old password wrong</span>\
    </form>\
    <form id='pic' action='' class='hidden' onsubmit='changePic()'>
      <input type='file' name='old' accept='image/*' id='new-pic'></input>
      <button type='submit'>Sumbit</button>
    </form>`;
document.getElementById('main').appendChild(current);

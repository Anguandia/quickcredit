// user application page
document.write(
    `<div id="main">\
    <h1 id='username'>all users</h1><hr>\
    <div id="main_main">\
    <input type="text" name="user" class="searchbox" onkeyup="filterData(0)"\
    placeholder="enter name to search user">\
    <tab class="search"><a href="user.html">Select</a></tab>\
    <div id="controls">\
      <label class='user'>Sort by:
      <select onchange='selectSort(event)'>\
      <option>--select--</option>\
      <option>Name</option>\
      <option>user id</option>\
      </select>\
    </div><hr>\
    <ul class="list">\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Anguandia Mike</span>\
      <span>18050630007</span></a>\
      <span>anguamike@yahoo.com</span>\
      <span class='lightgreen'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Benjamin Franklin</span>\
      <span>18070230301</span></a>\
      <span>benja@gmail.com</span>\
      <span class='lightgreen'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Isaac Asimov</span>\
      <span>18070630001</span></a>\
      <span>asim@hotmail.com</span>\
      <span class='lightgreen'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Fadil Rajab</span>\
      <span>18070630001</span></a>\
      <span>fadhil.rajab@mail.com</span>\
      <span class='lightgreen'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Peter Simon</span>\
      <span>18070630001</span></a>\
      <span>simo@kj.com</span>\
      <span class='green'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Famin Pierr</span>\
      <span>10070630001</span></a>\
      <span>famin@netpipper.com</span>\
      <span class='green'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Clera Serah</span>\
      <span>12120630001</span></a>\
      <span>flera@mail.com</span>\
      <span class='red' id='Not Verified'>Not Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Zadoch Simon</span>\
      <span>0807063000</span></a>\
      <span>zad@mail.com</span>\
      <span class='red' id='Not Verified'>Not Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Os pa mali</span>\
      <span>15070630301</span></a>\
      <span>ospamil@ymail.com</span>\
      <span class='navy'>Owing</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Bonny Musa</span>\
      <span>17070630001</span></a>\
      <span>mier@gmail.com</span>\
      <span class='red' id='Not Verified'>Not Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Tolea Ofin</span>\
      <span>18070630001</span></a>\
      <span>toto@mail.com</span>\
      <span class='red' id='Not Verified'>Not Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Karim Peter</span>\
      <span>18070230301</span></a>\
      <span>karim@example.com</span>\
      <span class='yellow'>Overdue</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Boran Siraj</span>\
      <span>18070630001</span></a>\
      <span>-----</span>\
      <span class='lightblue'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Fiona Paul</span>\
      <span>18070630001</span></a>\
      <span>kuku200@mail.com</span>\
      <span class='lightblue'>Verified</span>\
    </li>\
    <li>\
      <input type='checkbox'></input>\
      <a href='user.html?user_101029=view_User'><span class='name'>Douglas Marie</span>\
      <span>18070630001</span></a>\
      <span>no mail</span>\
      <span class='green'>Verified</span>\
    </li>\
    </ul>\
    </div>\
    <script src='static/scripts/user.js'></script>\
    </div>\
    `);

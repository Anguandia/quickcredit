/* eslint-disable linebreak-style */
// user application page
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<h1 id='username'>all users</h1><hr>\
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
    <ul class="list" id='list' onmouseover="showTip(this, 'click on user name or id to select user item', '-30%')">\
    </ul>\
    </div>`;
document.body.appendChild(main);

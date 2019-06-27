/* eslint-disable linebreak-style */
// loan application page
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<h1 id='username'>loan records</h1><hr>\
<div id="main_main">\
<input type="text" name="loan" class="searchbox" onkeyup="filterData(1)"\
placeholder="enter loan id to search">\
<tab class="search"><a href="detail.html${window.location.search}">Select</a></tab>\
<div id="controls">\
  <label class='universal'>Sort by:
  <select onchange='selectSort(event)'>\
  <option>--select--</option>\
  <option>Name</option>\
  <option>Loan id</option>\
  <option>Status</option>\
  </select>\
</label>
<label class='admin hidden'>Search for:
  <select onchange='selectSearch(event)'>\
  <option>--select--</option>\
  <option>User by Id</option>\
  <option>User by Name</option>\
  <option>Loan by Id</option>\
  <option>Loan by Name</option>\
  <option>Loan by Status</option>\
  </select>\
  </label>
</div><hr>\
<ul class="list" id='list'></ul>\
</div>`;
document.body.appendChild(main);

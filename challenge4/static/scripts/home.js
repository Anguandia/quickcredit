// loan application page
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<h1 id='username'>${localStorage.getItem('current user')}</h1><hr>\
    <div id="main_main">\
    <h3 class='home'>${localStorage.getItem('current user')}-Personal Dashboard</h3><hr>\
    <a href='client.html?path=loans?status=approved&email=${localStorage.getItem('email')}'>\
      <button class='dashboard _lightgreen navy'>\
        <p class='navy'>*Current loan: <span>${localStorage.getItem('currentLoan')}</span></p>\
      </button>\
    </a>\
    <a href='client.html?path=loans?status=repaid&email=${localStorage.getItem('email')}&repaid=true'>\
      <button class='dashboard _green white'>\
        <p>Completed: <span id='complete_loans'>${localStorage.getItem('history')}</span></p>\
      </button>\
    </a>\
    </div>`;
document.body.appendChild(main);

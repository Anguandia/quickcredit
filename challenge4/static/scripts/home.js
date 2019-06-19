// loan application page
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<h1 id='username'>${localStorage.getItem('current user')}</h1><hr>\
    <div id="main_main">\
    <h3 class='home'>${localStorage.getItem('current user')}-Personal Dashboard</h3><hr>\
    <button class='dashboard _lightgreen navy' id='Draft' onclick='loadOwn()'><p><a href=detail.html?u_loan_180524=view_loan style='text-decoration:none; color:navy'>*Current loan: <span>${localStorage.getItem('currentLoan')}</span></a></p></button>\
    <button class='dashboard _green white' id='Completed' onclick='loadOwnHistory()'><p>Completed: <span id='complete_loans'>${localStorage.getItem('history')}</span></p></button>\
    </div>`;
document.body.appendChild(main);

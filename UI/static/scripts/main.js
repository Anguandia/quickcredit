/*show elements relevant to particular page from general html
take in an array of parent elements(parents) some of whose
children are to be displayed for specific pages if any of their classes is/are in the array of required classes*/
function showPage(required, parents){
    // document.getElementById('name').innerHTML = localStorage.getItem('current user');
    //add class universal to any required class's array
    required.push('universal');
    // detect user type for menu rendering
    if(localStorage.getItem('role')){
        required.push(localStorage.getItem('role')=='Admin'?'admin':'user');
    } else {
        required.push('index');
    }
    for(var parent of parents){
        var cont = document.getElementById(parent);
        var elements = cont.querySelectorAll('*');
        // var elements = document.getElementById(parent).children;
        // document.getElementById(parent).style.display = 'block';
        cont.style.display = 'block';
        for(var element of elements){
            //get an array of classnames of each child element
            if(element.hasAttribute('class')){
                var classes = element.getAttribute('class');
                //check if atleast a class name of current element is aamong the classes required for display
                if(classes.split(' ').filter(value=>required.includes(value)).length>0){
                    //keep menu expansion icon hidden on largescreens
                    if(element.getAttribute('id')!='options'){
                        //display elements in each block as desired
                        if(parent=='auth'){
                            element.style.display = 'inline';
                        } else if(parent=='menu'){
                            element.style.display = 'block';
                        // include signup/in form loading
                        } else if(element.tagName=='LABEL' && element.childElementCount>1){
                            element.style.display = 'initial';
                            // call validation setting function for required input fields; all have two children each; the input and the asterisk span marking the field as required
                            addValidation(element);
                        } else {
                            element.style.display = '';
                        }
                    }
                } else {
                    element.style.display = 'none';
                }
            }
        }
    }
}

/*slide in and out menu pane to expand, overlapping main content
on smaller screens*/
var menu = document.getElementById('menu');
var icon = document.getElementById('iconcontainer');
function openMenu(){
    //only expand on screens smaller than 420px width
    if(window.innerWidth<620){
        if(window.innerWidth>window.innerHeight){
            menu.style.width = '50%';
        } else {
            menu.style.height = 'inherit';
            document.getElementById('options').style.display = 'none';
        }
    }
}

// slide out menu pane
function closeMenu(){
    if(window.innerWidth<620 && window.innerWidth>240){
        if(window.innerWidth>window.innerHeight){
            menu.style.width = '10%';
        } else {
            menu.style.height = '30%';
            document.getElementById('options').style.display = 'block';
        }
    }
}

//togle display of menu on click of icon
function showMenu(){
    menu.style.width = '100%';
    if(menu.style.display=='block'){
        menu.style.display = 'none';
    } else {
        menu.style.display ='block';
        openMenu();
    }
}

menu.onmouseover = openMenu;
menu.onmouseout = closeMenu;
icon.onclick = showMenu;

// add html validation for rquired form fields
addValidation = function(element){
    var inp = element.children[1];
    var name= inp.getAttribute('name');
    inp.setAttribute('required', true);
    inp.setAttribute('oninvalid', `this.setCustomValidity('${element.textContent} can not be empty')`);
};

//redirect to user profile page onsubmit signin/signup
//only for demonstration purpose
// set session particulars
function redirect(){
    // get and store current username and password on signup/in
    var q=document.getElementById('user_name');
    var r=document.getElementById('password');
    // localStorage.removeItem('current user');
    localStorage.setItem('current user', q.value);
    localStorage.setItem('password', r.value);
    // save current user role
    var role = document.getElementById('role');
    localStorage.setItem('role', role.value);
    // redirect to admin profile page if admin login
    var form = document.querySelector('form');
    if(role.value == 'Admin'){
        form.setAttribute('action', 'Admin.html');
    }
}

// sort lists(loans/users)
function sortData(j){
    var list, items, swap, i, current, next, needSwap;
    // list = document.getElementById("all_loans");
    list = document.querySelector('.list');
    swap = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (swap) {
        //start by saying: no switching is done:
        swap = false;
        items = list.children;
        // Loop through all list items
        for (i = 0; i < (items.length - 1); i++) {
            //start by saying there should be no switching:
            needSwap = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            current = items[i].getElementsByTagName("span")[j];
            next = items[i + 1].getElementsByTagName("span")[j];
            // highlight sorted variable
            current.style.background = 'aliceblue';
            // include the last row for highlighting
            next.style.background = 'aliceblue';
            // check if the two items should switch place eliminate case differences by using lowercase all through:
            if (current.innerHTML.toLowerCase() > next.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                needSwap = true;
                break;
            }
        }
        if(needSwap){
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            items[i].parentNode.insertBefore(items[i + 1], items[i]);
            swap = true;
        }
    }
}

// monitor status of sort parameter to trigger approprate sort
function selectSort(change){
    if(change.target.value === 'Name'){
        sortData(0);
    } else if(change.target.value == 'Loan id'){
        sortData(1);
    } else if(change.target.value == 'Status'){
        sortData(3);
    } else {
        sortData(1);
    }
}

// search loans/users by id
function filterData(j, filter){
    // declare variables
    var input, list, items, field, i;
    // check if search keyword(filter) not provided in call
    if(!filter){
        input = document.querySelector('.searchbox');
        // then get search key from search input
        filter = input.value;
    }
    list = document.querySelector('.list');
    items = list.children;
    // iterate throught each list item to locate search field
    for (i = 0; i < items.length; i++){
        // get search field
        field = items[i].getElementsByTagName('span')[j];
        // leave item display as is if current input value in search field
        if (field.innerHTML.indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
        // do not show item if input value not in search field
        items[i].style.display = 'none';
        }
    }
}

// load category of items in a diven admin ashboard tab
// function takes in the filter key from the status span id, intentionally named after the status  target status
function loadSelection(key, name, query){
    // check if HTMLHeadingElement(page name) not provided in calling function
    if(!name){
        // get and save current admin profile page heading in local storage to be retrieved for reconstitution after redirect
        name=document.getElementById('main').firstElementChild.textContent;
    }
    if(query){
        window.location.href = 'client.html'+query;
    } else {
        // recirect to appropriate raw list page; loans or users
        window.location.href = 'users.html?a_';
    }
    localStorage.setItem('name', name);
    // save the search key from the button id passed in function call as an argument
    localStorage.setItem('key', key);
    // we'll be seacrching by status value for loans, the 4th child element of each loans list item, save that to local storage too
    localStorage.setItem('j', 3);
}

// function called on load of page containing required raw list
function checkRedirect(){
    // check if page has been loaded by a redirect or by direct Navigation; if namesaved in localStorage, redirected
    if(localStorage.getItem('j')){
        // reconstitute admin page title and retrieve search key valuetoinvoke search call with parametized key value instead of getting key value from search input
        document.getElementById('main').firstElementChild.textContent = localStorage.getItem('name');
        // clear the redirect flag lest all admin page access attempts will be redirected
        var status = localStorage.getItem('key');
        var j = localStorage.getItem('j');
        filterData(j, status);
        localStorage.removeItem('j');
        var user = document.querySelector('#name');
    }
    if(window.location.search.slice(1,2)=='a'){
        showPage(['admin'], ['auth', 'menu', 'controls']);
    } else {
        showPage(['user'], ['auth', 'menu', 'controls']);
    }
}

// function to display feedback
function approve(resp, bg='green', color='white'){
    var msg = document.getElementById('msg');
    msg.innerHTML= resp;
    msg.style.display = 'block';
    msg.style.color = color;
    msg.style.background = bg;
    setTimeout(function(){
        msg.style.display = 'none';
    }, 4000);
}

// decode url query string to get admin function to execute on loan detail: verify, debit, view or approve
function decodeQuery(){
    // get query
    var query = window.location.search;
    // extract required class to be selectively loaded and page title from query string
    var key = query.slice(query.indexOf('=')+1);
    var heading = document.querySelector('h1');
    var sub = document.querySelector('h3');
    var raw = query.slice(3, query.indexOf('='));
    // constitute page title
    var title = raw.replace('_', ' ');
    var user = document.querySelector('#name');
    // constitute page purpose sub-heading
    sub.innerHTML = key.replace('_', ' ') || 'view user';
    if(query.slice(1, 2) == 'u'){
        heading.innerHTML = user.innerHTML;
        showPage(['user', key], ['auth', 'menu', 'loandetail']);
    } else {
        heading.innerHTML = title;
        showPage(['admin', key], ['auth', 'menu', 'loandetail']);
    }
}

function setUser(){
    var name=document.querySelector('#name');
    name.innerHTML = localStorage.getItem('current user');
}

// tailor sample loans' list to individual client details on client detail view page
function loadOwn(){
    var client = document.getElementById('client');
    client.innerHTML = localStorage.getItem('current user');
}

// force history tab to load past loans with current user's name
function loadOwnHistory(){
    loadSelection("Completed", "","?u_loan_180524=view_loan");
    var names = document.getElementsByClassName('name');
    var clients = [].slice.call(names);
    console.log(names);
    for(let name of names){
        name.innerHTML = localStorage.getItem('current user');
    }
}

// tweek user detail page to reflect custom field values from list item clicked
function setClient(elt){
    // save the name, email and status field values of the list item in browser to be used on detail page
    var client = elt.querySelector('.name');
    var status = elt.querySelector('#status');
    localStorage.removeItem('client');
    localStorage.setItem('client', client.textContent);
    localStorage.setItem('email', client.textContent.replace(/ /g, '').toLowerCase()+'@gmail.com');
    localStorage.setItem('status', status.innerHTML);
}

// rationalize loan detail values
// ensure installments and outstanding balance add up to total
function calc(){
    // declare variables
    var value, log, installments, balance, paid, initial, status;
    // define variables
    value = document.querySelector('#value').innerHTML;
    log = document.getElementById('log');
    installments = log.querySelectorAll('.pay');
    balance = document.querySelector('#balance');
    status = document.querySelector('#status');
    paid = 0;
    initial = installments[0];
    initial.textContent = '$' + value;
    status.style.color = 'indigo';
    // add installments paid
    for(var i=1; i<installments.length; i++){
        paid += parseInt(installments[i].innerHTML.slice(1));
    }
    // caclulate and write the balance
    var val = (parseInt(installments[0].innerHTML.slice(1)) - paid);
    balance.innerHTML = '$' + val;
    // change status when payment completed
    if(val<=0){
        status.color = 'green';
    }
    // balance completed loans for value sanity
    if(status.innerHTML=='Completed'){
        payment = document.createElement('li');
        id = Math.floor(Math.random()*100000000000);
        date = new Date();
        payment.innerHTML = `<span class='green universal'>Dr:</span>
        <span>transaction id - ${id};</span>
        <span class='green universal pay'>${'$' + val};</span>
        <span>date: ${date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()}</span>`;
        log.appendChild(payment);
        balance.innerHTML = '$000000';
    }
}
// make fucntion self calling
calc();

// balance payments to make sence for repaid loans view
function debit(){
    var log, amount, balance, debit, payment, lastchild, id, date, status;
    status = document.querySelector('#status');
    log = document.querySelector('#log');
    amount = document.querySelector('input').value.padStart(5, 0);
    balance = document.querySelector('#balance');
    debit = document.querySelector('#post');
    payment = document.createElement('li');
    id = Math.floor(Math.random()*100000000000);
    date = new Date();
    payment.innerHTML = `<span class='green universal'>Dr:</span>
    <span>transaction id - ${id};</span>
    <span class='green universal pay'>${'$' + amount};</span>
    <span>date: ${date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()}</span>`;
    log.appendChild(payment);
    approve('account debited');
    status.innerHTML = 'Current';
    calc();
}

// display and hide the signout dialogue box on clicking signout/cancel
function signout(){
    document.querySelector('#signoutt').style.display = 'block';
}
function cancel(){
    document.querySelector('#signoutt').style.display = 'none';
}

// clear current user and redirect to index page
function reset(){
    localStorage.clear();
    window.location.href = 'index.html';
}

/*check password and repeat password fields are identical in value*/
function checkRepeat(){
    var password = document.getElementById('password');
    var repeat = document.getElementById('confirm_password');
    console.log(password.value);
    if(repeat.value[repeat.value.length-1]!=password.value[repeat.value.length-1]){
        document.getElementById('repeat_error').style.display = 'initial';
    } else{
        document.getElementById('repeat_error').style.display = 'none';
    }
}

// passwordviewer
//display password view eye
var withEye = document.getElementsByTagName('form');

function disp(elt){
    var sh = elt.children[1];
    sh.style.display = 'block';
}


//view passwords
for(var i of withEye){
    i.addEventListener('focus', 'disp');
}

function see(elt){
        var field = elt.previousElementSibling;
        (field.getAttribute('type')=='password')?field.setAttribute('type', 'text'): field.setAttribute('type', 'password');
    }

// create and diplay tooltip on focus for 5s
// function takes in the element to show the tooltip for and the message to display
function showTip(elt, msg, x='100%', y='0%'){
    var tip = document.createElement('span');
    tip.setAttribute('id', 'tip');
    tip.style.visibility = 'visible';
    tip.style.right = x;
    tip.style.top = y;
    var ms = document.createTextNode(msg);
    tip.appendChild(ms);
    elt.appendChild(tip);
    setTimeout(function(){
        tip.style.visibility = 'hidden';
    }, 2000);
}

// simulate password change
function changePassword(){
    var old, next, form, error, account;
    old=document.getElementById('old');
    next=document.getElementById('new');
    form=document.getElementById('account');
    account=document.getElementById('butt');
    error=document.querySelector('.error');
    if(old.value==localStorage.getItem('password')){
        approve('password changed');
        localStorage.setItem('password', next.value);
        account.style.display = 'block';
    } else {
        error.style.display='block';
    }
}

function showForm(elt){
    document.querySelector('#account').style.display = 'block';
    elt.style.display = 'none';
}

/*show elements relevant to particular page from general html
take in an array of parent elements(parents) some of whose
children are to be displayed for specific pages if any of their classes is/are in the array of required classes*/
function showPage(required, parents){
    //add class universal to any required class's array
    required.push('universal');
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
function redirect(){
    var url;
    var role = document.getElementById('role');
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
        window.location.href = 'users.html';
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
        localStorage.clear('*');
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
    }, 3000);
}

// decode url query string to get admin function to execute on loan detail: verify, debit, view or approve
function decodeQuery(){
    // get query
    var query = window.location.search;
    console.log(query.slice(0,1));
    // extract required class to be selectively loaded and page title from query string
    var key = query.slice(query.indexOf('=')+1);
    var heading = document.querySelector('h1');
    var sub = document.querySelector('h3');
    var raw = query.slice(3, query.indexOf('='));
    // constitute page title
    var title = raw.replace('_', ' ');
    // constitute page purpose sub-heading
    heading.innerHTML = title;
    sub.innerHTML = key.replace('_', ' ') || 'view user';
    if(query.slice(1, 2) == 'u'){
        showPage(['user', key], ['auth', 'menu', 'loandetail']);
    } else {
        showPage(['admin', key], ['auth', 'menu', 'loandetail']);
    }
}

function checkRole(){
    var query, title, cl, role;
    query = window.location.search;
    title = query.slice(3, query.indexOf('='));
    cl = query.slice(query.indexOf('=') + 1);
    role = query.slice(1, 2);
    if(role == 'u'){}
}

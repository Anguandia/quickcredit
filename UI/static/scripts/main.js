/*show elements relevant to particular page from general html
take in an array of parent elements(parents) some of whose
children are to be displayed for specific pages if any of their classes is/are in the array of required classes*/
function showPage(required, parents){
    //add class universal to any required class's array
    required.push('universal');
    for(var parent of parents){
        var elements = document.getElementById(parent).children;
        document.getElementById(parent).style.display = 'block';
        for(var element of elements){
            //get an array of classnames of each child element
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
                    } else {
                        element.style.display = 'initial';
                    }
                }
            } else {
                element.style.display = 'none';
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
            menu.style.height = '5%';
            document.getElementById('options').style.display = 'block';
        }
    }
}

//togle display of menu on click of icon
function showMenu(){
    menu.style.width = '50%';
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

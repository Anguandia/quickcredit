document.write(
    `<div id='main'>\
      <form id='signinform' class='auth' action='apply.html'>\
        <label class='signin'>user Name<span>*</span>\
          <input type='text' name='user_name' id='username'\
          placeholder='enter user name or email'></input>\
        </label>\
        <label class='signup signin'>password<span>*</span>\
          <input type='password' id='password' placeholder='password'></input>\
        </label>\
        <label for='role' class='signin'>Signin as:\
          <select>\
            <option>client</option>\
            <option>Admin</option>\
          </select>\
        </label>\
        <button type='submit' id='submit_auth' class='signin signup'>submit</button>\
      </form>\
    </div>`);

/* eslint-disable linebreak-style */
const q = (new URLSearchParams(window.location.search));
const old = value => q.get(value);
const main = document.createElement('div');
main.setAttribute('id', 'main');
main.innerHTML = `<form id='authform' class='auth' action=''>
    <label class='signup'>first name<span>*</span>
      <input type='text' name='firstname' value = "${old('fullname') ? old('fullname').split(' ')[0] : old('firstname') || ''}"
      placeholder='first name'></input>
    </label>
    <label class='signup'>family name<span>*</span>
      <input type='text' name='lastname' value = "${old('fullname') ? old('fullname').split(' ')[1] : old('lastname') || ''}"
      placeholder='family name'></input>
    </label>
    <label class='signup signin'>email<span>*</span>
      <input name='email' type='email' id='email' placeholder='email' value="${old('email') || old('client') || ''}"></input>
    </label>
    <label class='signup'>phone
      <input type='tel' name='tel' class='signup' id='phone' placeholder='phone number'\
      value="${old('tel') || ''}">
      </input>
    </label>
    <label class='signup'>adress<span>*</span> <span id='extra'><em>Add</em> &#43</span>
      <input name='address' type='text' placeholder='work address; district*, town*, street*, block' value="${old('work') || old('address') || ''}"></input>
      <input name='address' type='text' class='extra hidden' placeholder='residence address; district*, town*, street*, block' value="${old('address') || old('residence') || ''}"></input>
      <input name='address' type='text' class='extra hidden' placeholder='home address; district*, town*, street*, block' value="${old('address') || old('home') || ''}"></input>
    </label>
    <div class='with_eye universal' onclick='disp(this)'>
    <label class='signup signin'>password<span>*</span>
    <input name='password' type='password' id='password' placeholder='password'\
    value="${old('password') || ''}"></input>
    </label>
    <div class='eye universal' onmousedown='see(this)'>
    <div id='pupil'></div>
    </div>
    </div>
    <div class='with_eye universal' onclick='disp(this)'>
    <label class='signup'>confirm password<span>*</span>
    <input name='confirm' type='password' id='confirm_password' oninput='checkRepeat()' placeholder='confirm password'></input>
    </label>
      <div class='eye universal' onmousedown='see(this)'>
        <div id='pupil'></div>
      </div>
    </div>
    <div class='with_eye universal hidden' onclick='disp(this)'>
    <label class='signup signin'>confirm password<span>*</span>
    <input type='password' id=''></input>
    </label>
        <div class='eye universal' onmousedown='see(this)'>
          <div id='pupil'></div>
        </div>
      </div>
    <button type='button' id='submit_auth' class='signin signup' onclick='sign()'>submit</button>
    <span id='rst'><a href='#' class='signin' id='resetlink'><em>reset password?</em></a></span>
    </form>
    `;
document.body.appendChild(main);

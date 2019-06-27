/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
let title = document.querySelector('h1');
const subTitle = document.querySelector('h3');
let id;

function showErrors(error) {
  const errors = document.getElementById('repeat_error');
  errors.style.display = 'inline-block';
  for (const err of error.split(',')) {
    const item = document.createElement('li');
    const error = document.createTextNode(err);
    item.appendChild(error);
    errors.appendChild(item);
  }
}

function sign() {
  const base = 'http://localhost:8000/api/v1/auth/';
  const path = /signin/.test(window.location.href) ? 'signin' : 'signup';
  const url = base + path;
  const query = (new URLSearchParams(window.location.search));
  //   let title = document.querySelector('h1');
  //   const subTitle = document.querySelector('h3');
  const data = new URLSearchParams(new FormData(document.getElementById('authform')));
  const postData = {
    method: 'POST',
    body: data,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   'Access-Control-Request-Headers': 'Content-Type',
    // //   'Access-Control-Allow-Origin': '*',
    // },
    mode: 'cors',
    cache: 'no-cache',
    // credentials: 'include'
    redirect: 'follow',
  };
  fetch(url, postData)
    .then(resp => resp.text())
    .then((result) => {
      alert(result);
      if (result.status == 201) {
        document.cookie = `autnorization=bearer ${result.data.token}`;
        window.location.href = `home.html?${data.toString()}`;
        title.textContent = result.data.email;
      } else if (result.status == 200) {
        document.cookie = `autnorization=bearer ${result.data.token}`;
        window.location.href = `home.html?${data.toString()}`;
        title = result.data.email;
      } else if (result.status == 401) {
        window.location.href = `signin.html?${data.toString()}`;
        showErrors();
      } else if (/exists/.test(result.error)) {
        window.location.href = `signin.html?${data.toString()}`;
        showErrors();
      } else if (result.status == 404) {
        alert(result.error);
        // window.location.href = `signup.html?${data.toString()}`;
        showErrors(result.error);
      } else {
        alert(result.error);
        showErrors(result.error);
      }
    }).catch(error => console.error({ error }));
}

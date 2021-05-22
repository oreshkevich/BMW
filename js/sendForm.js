const server = 'https://jsonplaceholder.typicode.com/posts';

const sendData = (data, callBack, falseCallBack) => {
 const request = new XMLHttpRequest();
 request.open('POST', server);
  request.addEventListener('readystatechange', () => {
    if(request.readyState !== 4) return;
    if(request.status === 200 || request.status === 201) {
      const response = JSON.parse(request.responseText);
      callBack(request.id);
    } else {
      falseCallBack(request.responseText)
      throw new Error(request.statusText)
    }
  });
 request.send(data)
};



const formHandler = (form) => {
  const smallElem = document.createElement('small');
  form.append(smallElem);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {};
    // console.log(form);
let flag = true;

    const buttonSubmit = form.querySelector('.button[type="submit"]');

    for(const elem of form.elements) {
      const {name, value} = elem;
      if (name) {
        if(value.trim()) {
          elem.style.border = '';
          data[name] = value.trim();
        } else {
          elem.style.border = '1px solid red';
          flag = false
          elem.value = '';
        }
      }
    }
    
    if(!flag) {
      return smallElem.textContent = 'Заполните все поля';
    }


   sendData(JSON.stringify(data), 
(id) => {
  smallElem.innerHTML = 'Ваша заявка №' + id + 
  '! <br> В ближайшее время с вами свяжемся!';
  smallElem.style.color = 'green';
  buttonSubmit.disabled = true;
  setTimeout(() => {
    smallElem.textContent = '';
    buttonSubmit.disabled = false;
  }, 5000)
}, 
(err) => {
  smallElem.textContent = 'К сожалению технические неполадки, попробуйте отправить заявку позже';
  smallElem.style.color = 'red';

 });
 form.reset();
  });
};

export default function sendForm() {
  const formElems = document.querySelectorAll('.form');
  formElems.forEach(formHandler);
}





// Refrencias HTML
const inputId = document.querySelector('#inputId');
const divAlertaOk = document.querySelector('#divAlertaOk');
const divAlertaError = document.querySelector('#divAlertaError');

const url = 'http://localhost:8080';
// const url = 'https://restserver-legg.herokuapp.com'

const formData = new FormData();

console.log(inputId.value);

formData.append('rol', inputId.value);

fetch(`${url}/api/roles`, {
    method: 'POST',
    body: formData    
})
    .then((response) => response.json())
    .then((rol) => {
        if(rol){
            divAlertaError.style.display='none';
            divAlertaOk.style.display='block';
        } else {
            divAlertaOk.style.display='none';
            divAlertaError.style.display='block';
        }
    });
// Refrencias HTML
const divTotal = document.querySelector('#divTotal');
const divRoles = document.querySelector('#divRoles');

let url ='https://digbal_rsw_server.herokuapp.com';
const ambiente = process.env.AMBIENTE;

if(ambiente === 0) {
    url = 'http://localhost:8080';
}

fetch(`${url}/api/roles`, {
    method: 'GET',    
})
    .then((response) => response.json())
    .then((data) => {
        const total = data.total;
        divTotal.innerHTML = `Total Registro(s): ${total}`;
        
        const plantilla = data.roles.map((roles) => `<li>${roles._id} - ${roles.rol} - ${roles.estado}</li>`);
        divRoles.innerHTML = `<ul>${plantilla}</ul>`;
    });
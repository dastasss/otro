




//CONFIRMAR BORRADO//
const btnDelete = document.querySelectorAll('.btn-delete');
if (btnDelete) {
    const btnArray = Array.from(btnDelete);
    btnArray.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (!confirm('ESTAS SEGURO DE BORRAR PACIENTE??')) {
                e.preventDefault();
            }
        });
    })
}

//FILTRO//


function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}






const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {

    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    rut: /^[0-9]+-[0-9kK]{1}$/, //  12 digitos.puntos , guion y letra k
    telefono: /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/, // +56 987654321
    direccion: /^[a-zA-Z0-9À-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    ciudad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    nacimiento: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/, //  12 digitos.puntos , guion y letra k
    civil: /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.

}

const campos ={
    nombre : false,
    apellido : false,
    rut : false,
    telefono : false,
    direccion : false,
    ciudad : false,
    email : false,
    nacimiento : false,
    civil : false
}


const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'nombre':

            validarCampo(expresiones.nombre, e.target, 'nombre');



            break;


        case 'apellido':

            validarCampo(expresiones.apellido, e.target, 'apellido');


            break;

        case 'rut':
            validarCampo(expresiones.rut, e.target, 'rut');


            break;

        case 'telefono':

            validarCampo(expresiones.telefono, e.target, 'telefono');


            break;


        case 'direccion':

            validarCampo(expresiones.direccion, e.target, 'direccion');


            break;

        case 'ciudad':

            validarCampo(expresiones.ciudad, e.target, 'ciudad');


            break;


        case 'email':

            validarCampo(expresiones.email, e.target, 'email');


            break;

        case 'nacimiento':

            validarCampo(expresiones.nacimiento, e.target, 'nacimiento');


            break;


        case 'civil':

            validarCampo(expresiones.civil, e.target, 'civil');


            break;



    }




}


const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;



    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo}  .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('click', (e) => {
    

    if(campos.nombre && campos.apellido && campos.rut && campos.telefono && campos.direccion && campos.ciudad && campos.email && campos.born && campos.ecivil){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		             document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
           }       

});








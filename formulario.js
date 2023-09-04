document.addEventListener('DOMContentLoaded', function() {

    const email = {
        nombre: '',
        email: '',
        telefono: '',
        select: '',
        mensaje: '',
    }


    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const selectInput = document.querySelector('#select');
    const mensajeInput = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const botonSubmit = document.querySelector('#formulario button[type="submit"]');
    const botonReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    nombreInput.addEventListener('blur', validar);
    emailInput.addEventListener('blur', validar);
    telefonoInput.addEventListener('blur', validar);
    selectInput.addEventListener('blur', validar);
    mensajeInput.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    botonReset.addEventListener('click', function(e) {
        e.preventDefault();

        resetForm();
    });

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.remove('spinner-none');

        setTimeout(() => {
            spinner.classList.add('spinner-none');

            resetForm();

            const alertaExito = document.createElement('p')
            alertaExito.classList.add('alerta', 'centrar');
            alertaExito.textContent = 'Formulario enviado con Exito'

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }


    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        } 

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('Email no valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        console.log(email);

        comprobarEmail();

    }

    function mostrarAlerta( mensaje, referencia ) {

        limpiarAlerta(referencia);
        
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('boton-error');

        referencia.appendChild(error)
    }

    function limpiarAlerta( referencia ) {
        const alerta = referencia.querySelector('.boton-error');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail( email ) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }
    
    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            botonSubmit.classList.add("boton-disabled");
            botonSubmit.disabled = true;
            
        } else {
            botonSubmit.classList.remove("boton-disabled");
            botonSubmit.disabled = false;
        }
        
    }

    function resetForm() {
        email.nombre = '',
        email.email = '',
        email.telefono = '',
        email.select = '',
        email.mensaje = '',

        formulario.reset()

        comprobarEmail();
    }
});
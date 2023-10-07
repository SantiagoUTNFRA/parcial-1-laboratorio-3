import { vehiculosData } from './datos.js';

import {
    actualizarTablaSegunFiltro, devolverPorFiltro, llenarTabla, limpiarTabla, limpiarFormulario, crearFila, toggleTableColumn, addCheckboxListener, devolverIdMaximo, agregarVehiculo, modificarVehiculo, eliminarVehiculo
} from './funciones.js';

const frmAbm = document.getElementById('frmAbm');
const datoFiltrado = document.getElementById('filter');
const tablaDatos = document.getElementById('miTabla');
const btnVelocidadPromedio = document.getElementById('calcular');
const textBoxEdadPromedio = document.getElementById('edad-input');
const btnAgregarVehiculo = document.getElementById('boton-agregar');
const txbId = document.getElementById('id-abm');
const btnAceptar = document.getElementById('aceptar');
const headerRow = document.querySelector('#miTabla thead tr');
const chkId = document.getElementById('id');
const chkModelo = document.getElementById('modelo');
const chkAnoFab = document.getElementById('anoFab');
const chkVelMax = document.getElementById('velMax');
const chkAltMax = document.getElementById('altMax');
const chkAutonomia = document.getElementById('autonomia');
const chkCantPuertas = document.getElementById('cantPuertas');
const chkCantRue = document.getElementById('cantRuedas');
const tipoSeleccionado = document.getElementById("tipo");
const atributo3Label = document.querySelector("label[for='altMax-abm']");
const atributo4Label = document.querySelector("label[for='autonomia-abm']");
const atributo3Input = document.getElementById("altMax-abm");
const atributo4Input = document.getElementById("autonomia-abm");

let sortingState = {
    column: null,
    ascending: true
};

addCheckboxListener(chkId, tablaDatos, 0);
addCheckboxListener(chkModelo, tablaDatos, 1);
addCheckboxListener(chkAnoFab, tablaDatos, 2);
addCheckboxListener(chkVelMax, tablaDatos, 3);
addCheckboxListener(chkAltMax, tablaDatos, 4);
addCheckboxListener(chkAutonomia, tablaDatos, 5);
addCheckboxListener(chkCantPuertas, tablaDatos, 6);
addCheckboxListener(chkCantRue, tablaDatos, 7);

document.addEventListener('DOMContentLoaded', () => {
    llenarTabla(vehiculosData);
});

datoFiltrado.addEventListener("change", actualizarTablaSegunFiltro);


btnVelocidadPromedio.addEventListener("click", () => {
    const listaFiltrada = devolverPorFiltro(vehiculos, datoFiltrado.value);
    const sumaVelocidad = listaFiltrada.reduce((acc, vehiculo) => acc + vehiculo.velocidadMaxima, 0);
    const promedioVelocidad = sumaVelocidad / listaFiltrada.length;

    textBoxEdadPromedio.value = promedioVelocidad;
});


btnAgregarVehiculo.addEventListener("click", function () {
    // Remove the "hidden" class from the form element to show it
    frmAbm.classList.remove("hidden");
});


btnAceptar.addEventListener("click", () => {

    if (txbId.value.trim() === '' || txbNombre.value.trim() === '' || txbApellido.value.trim() === '' || txbEdad.value.trim() === '' || dropDownEdad.value.trim() === '') {
        alert("Por favor completá los campos correctamente");
    }
    else {
        const vehiculoNueva = {
            id: devolverIdMaximo(vehiculosData) + 1,
            nombre: txbNombre.value.trim(),
            apellido: txbApellido.value.trim(),
            edad: txbEdad.value.trim(),
            edadSeleccionada: dropDownEdad.value.trim()
        };

        vehiculosData.push(vehiculoNueva);
    }

    limpiarFormulario();
    llenarTabla(vehiculosData);
    document.getElementsByClassName('form-abm')[0].hidden = true;
});

tipoSeleccionado.addEventListener("change", function () {
    switch (this.value) {
        case "aereo":
            atributo3Label.innerText = "Altura Máxima:";
            atributo4Label.innerText = "Autonomía:";
            atributo3Label.classList.remove("hidden");
            atributo3Input.classList.remove("hidden");
            atributo4Label.classList.remove("hidden");
            atributo4Input.classList.remove("hidden");
            break;
        case "terrestre":
            atributo3Label.innerText = "Cantidad de Puertas:";
            atributo4Label.innerText = "Cantidad de Ruedas:";
            atributo3Label.classList.remove("hidden");
            atributo3Input.classList.remove("hidden");
            atributo4Label.classList.remove("hidden");
            atributo4Input.classList.remove("hidden");
            break;
        default:
            atributo3Label.innerText = "";
            atributo4Label.innerText = "";
            atributo3Label.classList.add("hidden");
            atributo3Input.classList.add("hidden");
            atributo4Label.classList.add("hidden");
            atributo4Input.classList.add("hidden");
    }
});

headerRow.querySelectorAll('th').forEach(headerCell => {
    headerCell.addEventListener('dblclick', () => {
        const columnHeaderId = headerCell.id;
        let vehiculosDataOrdenado;

        if (sortingState.column !== columnHeaderId) {
            sortingState.ascending = true;  // Reset the order if new column is clicked
        }

        switch (columnHeaderId) {
            case 'id-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.id - b.id : b.id - a.id);
                break;
            case 'modelo-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.modelo.localeCompare(b.modelo) : b.modelo.localeCompare(a.modelo));
                break;
            case 'anoFab-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.anoFab - b.anoFab : b.anoFab - a.anoFab);
                break;
            case 'velMax-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.velMax - b.velMax : b.velMax - a.velMax);
                break;
            case 'altMax-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.altMax - b.altMax : b.altMax - a.altMax);
                break;
            case 'autonomia-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.autonomia - b.autonomia : b.autonomia - a.autonomia);
                break;
            case 'cantPuer-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.cantPuertas - b.cantPuertas : b.cantPuertas - a.cantPuertas);
                break;
            case 'cantRue-header':
                vehiculosDataOrdenado = vehiculosData.sort((a, b) => sortingState.ascending ? a.cantRue - b.cantRue : b.cantRue - a.cantRue);
                break;
        }

        llenarTabla(vehiculosDataOrdenado);

        sortingState.column = columnHeaderId;
        sortingState.ascending = !sortingState.ascending;
    });
});

document.getElementById('aceptar').addEventListener('click', agregarVehiculo);
document.getElementById('modificar').addEventListener('click', modificarVehiculo);
document.getElementById('eliminar').addEventListener('click', eliminarVehiculo);
import Vehiculo from "./vehiculo.js";
import Aereo from "./aereo.js";
import Terrestre from "./terrestre.js";

const txbModelo = document.getElementById('modelo-abm');
const txbAnoFab = document.getElementById('anoFab-abm');
const txbVelMax = document.getElementById('velMax-abm');
const txbAltMax = document.getElementById('altMax-abm');
const txbAutonomia = document.getElementById('autonomia-abm');
const txbCantPuertas = document.getElementById('cantPuertas-abm');
const txbCantRue = document.getElementById('cantRue-abm');

let listaFiltrada;


function actualizarTablaSegunFiltro() {
    const valorSeleccionado = datoFiltrado.value;

    console.log(valorSeleccionado);

    listaFiltrada = vehiculosData.filter((dato) => {
        if (valorSeleccionado === "aereo") {
            return dato instanceof Aereo;
        } else if (valorSeleccionado === "terrestre") {
            return dato instanceof Terrestre;
        } else {
            return true;
        }
    });

    console.log(listaFiltrada)

    limpiarTabla();
    llenarTabla(listaFiltrada);
}

function devolverPorFiltro(data, filtro) {
    const listaFiltrada = [];

    console.log(filtro)

    data.forEach((dato) => {
        if ((filtro === "aereo" && dato.alturaMaxima !== undefined) || (filtro === "terrestre" && dato.cantPuertas !== undefined)) {
            listaFiltrada.push(dato);
        }
    });

    return listaFiltrada;
}

function llenarTabla(data) {
    limpiarTabla();
    const tbody = tablaDatos.querySelector('tbody');
    data.forEach((dato) => {
        const fila = crearFila(dato);
        tbody.appendChild(fila);
    });
}

function limpiarTabla() {
    const tbody = tablaDatos.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function limpiarFormulario() {
    txbId.value = '';
    txbModelo.value = '';
    txbVelMax.value = '';
    txbAltMax.value = '';
    txbAnoFab.value = '';
    txbAutonomia.value = '';
    txbCantPuertas.value = '';
    txbCantRue.value = '';
    dropDownEdad.value = '';
}

function crearFila(objeto) {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${objeto.id}</td>
      <td>${objeto.modelo}</td>
      <td>${objeto.anoFab}</td>
      <td>${objeto.velMax || ''}</td>
      <td>${objeto.altMax || ''}</td>
      <td>${objeto.autonomia || ''}</td>
      <td>${objeto.cantPue || ''}</td>
      <td>${objeto.cantRue || ''}</td>
    `;

    return fila;
}

function toggleTableColumn(table, columnIndex, shouldShow) {
    for (let row of table.rows) {
        let cell = row.cells[columnIndex];
        if (cell) {
            cell.style.display = shouldShow ? '' : 'none';
        }
    }
}

function addCheckboxListener(checkboxElement, table, columnIndex) {
    checkboxElement.addEventListener("change", () => {
        toggleTableColumn(table, columnIndex, checkboxElement.checked);
    });
}

function devolverIdMaximo(data) {

    let flag = true;
    let idMaximo;
    let idMinimo;

    vehiculosData.forEach(element => {
        if (flag == true) {
            idMaximo = element.id;
            idMinimo = element.id;
            flag = false
        } else {

            if (element.id > idMaximo) {
                idMaximo = element.id;
            }

            if (element.id < idMinimo) {
                idMinimo = element.id;
            }
        }
    });

    return idMaximo;
}

function agregarVehiculo() {
    let vehiculo = {
        id: Date.now(),
        modelo: txbModelo.value,
        anoFab: Number(txbAnoFab.value),
        velMax: Number(txbVelMax.value)
    };

    const tipo = document.getElementById('tipo').value;

    if (tipo === "aereo") {
        vehiculo.altMax = Number(txbAltMax.value);
        vehiculo.autonomia = Number(txbAutonomia.value);
    } else if (tipo === "terrestre") {
        vehiculo.cantPue = Number(txbCantPuertas.value);
        vehiculo.cantRue = Number(txbCantRue.value);
    }

    arrayData.push(vehiculo);
    limpiarFormulario();
}

function modificarVehiculo() {
    const id = Number(document.getElementById('id-abm').value);
    const vehiculo = arrayData.find(v => v.id === id);

    if (vehiculo) {
        vehiculo.modelo = txbModelo.value;
        vehiculo.anoFab = Number(txbAnoFab.value);
        vehiculo.velMax = Number(txbVelMax.value);

        const tipo = document.getElementById('tipo').value;

        if (tipo === "aereo") {
            vehiculo.altMax = Number(txbAltMax.value);
            vehiculo.autonomia = Number(txbAutonomia.value);
        } else if (tipo === "terrestre") {
            vehiculo.cantPue = Number(txbCantPuertas.value);
            vehiculo.cantRue = Number(txbCantRue.value);
        }
    }
}

function eliminarVehiculo() {
    const id = Number(document.getElementById('id-abm').value);
    const index = arrayData.findIndex(v => v.id === id);
    if (index !== -1) {
        arrayData.splice(index, 1);
    }
    limpiarFormulario();
}


export { actualizarTablaSegunFiltro, devolverPorFiltro, llenarTabla, limpiarTabla, limpiarFormulario, crearFila, toggleTableColumn, addCheckboxListener, devolverIdMaximo, agregarVehiculo, modificarVehiculo, eliminarVehiculo };

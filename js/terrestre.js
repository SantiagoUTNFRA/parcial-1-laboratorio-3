import Vehiculo from './vehiculo.js';


class Terrestre extends Vehiculo {
  constructor(id, modelo, anioFabricacion, velocidadMaxima, cantPuertas, cantRuedas) {
    super(id, modelo, anioFabricacion, velocidadMaxima);

    if (typeof cantPuertas !== 'number' || cantPuertas <= 0) {
      throw new Error('El campo "cantPuertas" debe ser un número positivo.');
    }
    if (typeof cantRuedas !== 'number' || cantRuedas <= 0) {
      throw new Error('El campo "cantRuedas" debe ser un número positivo.');
    }

    this.cantPuertas = cantPuertas;
    this.cantRuedas = cantRuedas;
  }

  toString() {
    return (
      super.toString() +
      `, Cantidad de Puertas: ${this.cantPuertas}, Cantidad de Ruedas: ${this.cantRuedas}`
    );
  }
}

export default Terrestre;

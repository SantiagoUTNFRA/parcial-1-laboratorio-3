import Vehiculo from './vehiculo.js';

class Aereo extends Vehiculo {
  constructor(id, modelo, anioFabricacion, velocidadMaxima, alturaMaxima, autonomia) {
    super(id, modelo, anioFabricacion, velocidadMaxima);

    if (typeof alturaMaxima !== 'number' || alturaMaxima <= 0) {
      throw new Error('El campo "altMax" debe ser un número positivo.');
    }
    if (typeof autonomia !== 'number' || autonomia <= 0) {
      throw new Error('El campo "autonomia" debe ser un número positivo.');
    }

    this.alturaMaxima = alturaMaxima;
    this.autonomia = autonomia;
  }

  toString() {
    return (
      super.toString() + `, Altura Máxima: ${this.alturaMaxima}, Autonomía: ${this.autonomia}`
    );
  }
}

export default Aereo;

class Vehiculo {
    constructor(id, modelo, anioFabricacion, velocidadMaxima) {
      if (typeof id !== 'number' || id <= 0) {
        throw new Error('El campo "id" debe ser un número positivo.');
      }
      if (typeof modelo !== 'string' || modelo === '') {
        throw new Error('El campo "modelo" no puede estar vacío.');
      }
      if (typeof anioFabricacion !== 'number' || anioFabricacion <= 0) {
        throw new Error('El campo "anioFabricacion" debe ser un número positivo.');
      }
      if (typeof velocidadMaxima !== 'number' || velocidadMaxima <= 0) {
        throw new Error('El campo "velocidadMaxima" debe ser un número positivo.');
      }
  
      this.id = id;
      this.modelo = modelo;
      this.anioFabricacion = anioFabricacion;
      this.velocidadMaxima = velocidadMaxima;
    }
  
    toString() {
      return `${this.modelo}, Año de Fabricación: ${this.anioFabricacion}, Velocidad Máxima: ${this.velocidadMaxima}`;
    }
  }
  
  export default Vehiculo;
  
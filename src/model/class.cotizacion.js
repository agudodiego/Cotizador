export class Cotizacion {
    constructor(costoM2, propiedad, factorPropiedad, ubicacion, factorUbicacion, metros2) {
        this.costoM2 = parseFloat(costoM2)
        this.propiedad = propiedad
        this.factorPropiedad = parseFloat(factorPropiedad)
        this.ubicacion = ubicacion
        this.factorUbicacion = parseFloat(factorUbicacion)
        this.metros2 = parseInt(metros2)
        this.poliza = 0.00
    }

    cotizarPoliza() {
        let resultado = (this.costoM2 * this.factorPropiedad * this.factorUbicacion * this.metros2)
        this.poliza = resultado
            return resultado.toFixed(2)
    }
    
}
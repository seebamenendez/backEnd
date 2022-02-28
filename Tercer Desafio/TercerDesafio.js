function mostrarPalabrasEnXTiempo(
    texto,
    tiempo = 1000,
    callbackFunction,
    esUltimo
) {
    return new Promise((resolve) => {
        let array = texto.split(' ');
        let contadorPalabras = 0;
        let intervalID = setInterval(() => {
            if (contadorPalabras < array.length) {
                console.log(array[contadorPalabras]);
                contadorPalabras++;
            } else {
                clearInterval(intervalID);
                resolve(contadorPalabras);
                callbackFunction(esUltimo);
            }
        }, tiempo);
    });
}

const ejecucion = async () => {
    let cantidad = await mostrarPalabrasEnXTiempo(
        'este es el primer texto',
        500,
        loader,
        false
    );
    cantidad += await mostrarPalabrasEnXTiempo(
        'ahora el segundo',
        500,
        loader,
        false
    );
    cantidad += await mostrarPalabrasEnXTiempo(
        'termina con el tercero',
        500,
        loader,
        true
    );

    console.log(`${cantidad} palabras mostradas`);
};

const loader = (esUltimo) => {
    esUltimo
        ? console.log('...Proceso completo...')
        : console.log(`...Esperando siguiente texto... `);
};

ejecucion();
const { fromEvent, map } = rxjs;

//tomando los elementos del DOM:
const textBox = document.getElementById("textBox");
const textMirror = document.getElementsByTagName("span")[0];

//tomando los eventos del DOM:
const textObservable = fromEvent(textBox, "keyup");

//haciendo un pipe para alterar el texto:
const textoInvertido = textObservable.pipe(
    map(event => {
        if (event.target.value === "error") {
            observer.error("Se desuscribió al observer por escribir ´error´");
        }
        if (event.target.value === "completed") {
            observer.complete();
        }
        let mirror = event.target.value.split('').reverse().join('');
        return mirror
    })
)

//hago una variable que se cambia a false cuando se desuscribe por escribir error o completed, de forma que no se ejecute de vuelta al pasar los 30 segundos.
let suscribed = true;

//haciendo una función que limpiará e inhabilitará los input, además de realizar la desuscripción: 
const disableMirror = () => {
    textBox.value = "";
    textBox.setAttribute("disabled", true)
    textMirror.innerHTML = "";
    observer.unsubscribe();
    suscribed = false;
}

//suscribiendose al observable:
let observer = textoInvertido.subscribe({
    next: (valor) => {
        textMirror.innerHTML = valor;
    },
    error: (error) => {
        disableMirror();
        console.error(error);
    },
    complete: () => {
        disableMirror();
        console.info("La operación se completó y se desuscrubió al observer.");
    }
})

//unsubscribiendose luego de 30 segundos:
setTimeout(() => {
    if (suscribed) {
        disableMirror();
        console.log("Se desuscribió al observable luego de pasar 30 segundos.")
    } else {
        console.log("Pasó el tiempo pero ya se había desuscripto")
    }
}, 30000)
const operaciones = async ()=>{
    try {
        let calculo = await import ("./Calculos.js");
        let res = await calculo.operacion(5, 4, "suma");
        console.log(res);
        res = await calculo.operacion(7, 3, "resta");
        console.log(res);
        res = await calculo.operacion(7, 3, "division");
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}
operaciones();
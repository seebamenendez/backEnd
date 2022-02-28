class Calculo {
    private operacion:string;
    private num1: number;
    private num2: number;
    constructor (operacion:string, num1: number, num2: number){
        this.operacion = operacion;
        this.num1 = num1;
        this.num2 = num2;
    }
    resultado(){
        if (this.operacion === "suma") return (this.num1 + this.num2);
        return (this.num1 - this.num2);
    }
}

export const operacion = (num1:number, num2:number, str:string)=>{
    return new Promise((resolve, reject) =>{
        if (str === "suma" || str === "resta") {
            let op:Calculo;
            op = new Calculo(str, num1, num2);
            resolve(op.resultado());
        }else{
            reject(`ERROR! El 3er parametro solo puede ser "suma" o "resta" y se coloco "${str}"`);
        }
    })
}
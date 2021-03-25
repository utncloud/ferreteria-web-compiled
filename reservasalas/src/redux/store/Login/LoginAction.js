export const INICIO_SESION = 'INICIO_SESION';
export const FIN_SESION = 'FIN_SESION';

// Se crean dos acciones
export function inicioSesion(valor){
    console.log("Action: inicioSesion");
    console.log(valor);
  return {
    type: INICIO_SESION,
    data: valor
  }
}

export function finSesion(){
    console.log("Action: finSesion");
  return {
    type: FIN_SESION,
    payload: null
  }
}
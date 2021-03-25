import React, { Component } from 'react';

const apiUrl= "http://localhost:5001/api/rooms";

class RoomService extends React.Component{
    getRoomListFromApi = ()=> new Promise((resolve, reject) =>{
        fetch(apiUrl)
            .then(respuesta => respuesta.json())
            .then(
                (resultado) => {
                    resolve (resultado);
                },
                // Manejo de errores
                (errores) => {
                    reject ({
                        error: errores,
                        estaCargado: true,
                        rooms: []
                    });
                }
            )
    })

    insertRoom = (values)=> new Promise((resolve, reject)=>{
        let newRoom = {
            room: values.room,
            capacity: values.capacity,
            isBusy:false,
            start: null,
            end: null
          };
          fetch(apiUrl,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRoom),
                })
            .then(respuesta => respuesta.json())
            .then(
              (resultado) => {
                resolve(resultado);
              },
              // Manejo de errores
              (errores) => {
                reject(errores);
              }
            );
    })

    updaterooms = (rooms)=> new Promise((resolve, reject)=>{
        fetch(apiUrl + "/updateall",
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(rooms),
            })
              .then(respuesta => respuesta.json())
              .then(
                (resultado) => {   
                    resolve(resultado);
                },
                // Manejo de errores
                (errores) => {
                    reject(errores);
                }
              );
      })
}

export default RoomService;
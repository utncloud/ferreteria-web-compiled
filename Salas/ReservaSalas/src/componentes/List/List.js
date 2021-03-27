import React from 'react';
import  './List.css';
import RoomData from '../RoomData/RoomData';

const Opcion = ( {onClick, room} ) => {
    return (
     <div>
        <li className = "itemList" href="a" onClick={onClick}>{room}</li>
     </div>
    )
   };  

export const List = (ComponenteEnvuelto) =>
class List extends React.Component{

    constructor(props) {
        super(props);
        this.LlamarCambioEstado = this.LlamarCambioEstado.bind(this);
        this.state = { currentRoom : null };
      }

    LlamarCambioEstado(room) {
        if (this.props.cambioEstadoRoom){
            let datos = this.cambiarEstado(room);
            this.props.cambioEstadoRoom(datos);
        }
    }

    cambiarEstado(room){
        let datos =[];
        this.props.roomsList.forEach(item => {
            if (item.room === room.room){
                item.isBusy = !item.isBusy;
                this.setState({
                    currentRoom: item
                  });
            }
            datos.push(item);
        });
        return datos;
    }

    render(){
        return (   
            <ComponenteEnvuelto 
                {...this.props}
                currentRoom = {this.state.currentRoom}
                LlamarCambioEstado = {this.LlamarCambioEstado}/>
        );
    }
}

const LoadReservationList = ({ roomsList, LlamarCambioEstado, currentRoom }) =>{
    return (
    <div className="groppingMainDiv">
        <div className="maindiv">                        
            {ExistsRoomsByStatus(false, roomsList) && 
                <div>
                    <div id="myDIV" class="header"><h1>Seleccione una Sala para reservar</h1></div>
                    <div>                    
                        <ul id="myUL">
                            {/* <GetDetailList isBusy = {false} roomsList = {roomsList} LlamarCambioEstado = {LlamarCambioEstado}></GetDetailList> */}
                            { GetDetailList(false, roomsList, LlamarCambioEstado)}
                        </ul>
                    </div>
                </div>
            }                        

            {ExistsRoomsByStatus(true, roomsList) && 
                <div>
                    <div id="myDIV" class="header"><h1>Cancele una sala al dar click</h1></div>
                    <div>                
                        <ul id="myUL">                                        
                            {/* <GetDetailList isBusy = {true} roomsList = {roomsList} LlamarCambioEstado = {LlamarCambioEstado}></GetDetailList> */}
                            { GetDetailList(true, roomsList, LlamarCambioEstado)}
                        </ul>
                    </div>
                </div>
            }
        </div>
    
        <div>
            {(currentRoom !== null && currentRoom !== undefined) &&
                <div className="RoomData">
                    <RoomData room={currentRoom}/>
                </div>
            }
        </div>
    </div>
    );
}

const LoadList = ({ roomsList }) => 
    <div className="groppingMainDiv">
        <div className="maindiv">                        
            {roomsList.length > 0 && 
                <div>
                    <div id="myDIV" className="header"><h1>Lista</h1></div>
                    <div>                    
                        <ul id="myUL">
                            { GetItemList(roomsList) }
                        </ul>
                    </div>
                </div>
            }
        </div>
    </div>

const GetList = ({ LlamarCambioEstado, currentRoom, roomsList, isOnlyList }) => {
    return isOnlyList ? <LoadList roomsList = {roomsList}/> : <LoadReservationList roomsList = {roomsList} LlamarCambioEstado = {LlamarCambioEstado} currentRoom = {currentRoom} ></LoadReservationList>
}

export const ListHOC = List(GetList);

const ExistsRoomsByStatus = (isBusy, roomsList) =>{
    let rooms =[];
    roomsList.forEach(item => {
        if (item.isBusy === isBusy){
           rooms.push(item); 
        }
    });
    return rooms.length > 0;
}

const GetItemList = (roomsList)=>{
    let element=[];
    roomsList.forEach(item => {
        let option = (<Opcion key={item.room} room={item.room}/>);
        element.push(option);
    });
    return element;
}

  const GetDetailList = (isBusy, roomsList, LlamarCambioEstado) => {
    let element=[];
    roomsList.forEach(item => {
        if (item.isBusy === isBusy){
            let option = (<Opcion key={item.room} room={item.room} onClick={LlamarCambioEstado.bind(this, item, roomsList)}/>);
            element.push(option);
        }
    });
    return element;
}


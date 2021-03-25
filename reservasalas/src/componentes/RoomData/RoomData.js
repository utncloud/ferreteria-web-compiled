import React from 'react';
import './RoomData.css';

class RoomData extends React.Component{

    constructor(props) {
        super(props);       
        
        this.state = {
                room: "Room 1",
                capacity: 6,
                start: new Date(),
                end: new Date()
            };
      }
    
      componentDidMount() {
        
      }
    
      componentWillUnmount() {
        
      }

    render(){
        if (this.props.room === undefined || this.props.room == null || !this.props.room){
            return null;
        }
        return (
            <div>
                <h2>Última sala {this.props.room.isBusy ? "seleccionada" : "cancelada"}</h2>
                <div>
                    <h3>Sala: {this.props.room.room}</h3>
                </div>
                <div>
                    <h3>Capacidad: {this.props.room.capacity} personas</h3>                    
                </div>
                <div>
                    <h3>Estado: {this.props.room.isBusy ? "Ocupado" : "Libre"}</h3>                    
                </div>
            </div>
        );
    }
}

export default RoomData;
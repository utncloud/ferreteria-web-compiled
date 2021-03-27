// Render Prop
import React from 'react';
import '../reservation/RoomReservation.css';
import {ListHOC} from '../List/List';
import RoomService from '../../services/RoomService';

var componenteLista=null;
var service = null;

class RoomReservation extends React.Component{
  
  constructor(props) {
      super(props);
      this.cambioEstadoRoom = this.cambioEstadoRoom.bind(this);
      this.state = {
        error: null,
        estaCargado: false,
        rooms: [],
        addNewRow:false
      };
      service = new RoomService();
    }

    getComponenteLista() {
      return (
        <ListHOC roomsList={this.state.rooms} cambioEstadoRoom={this.cambioEstadoRoom} ></ListHOC>
      );
    } 

    cambioEstadoRoom (rooms){
      service.updaterooms(rooms)
      .then(data => {
          this.setState({
            rooms: data
          });
        })
      .catch(err =>{
        this.setState({
            error: err,
            estaCargado: true,
            rooms: []
        });
        console.log('Error from updaterooms() with async( When promise gets rejected ): ' + err)
      });
    }

  componentDidMount() {
    service.getRoomListFromApi()
      .then(data => service.getRoomListFromApi())
      .then(data => {
          this.setState({
            rooms: data
          });
        })
      .catch(err =>{
        this.setState({
          rooms: []
        });
        console.log('Error from getRoomListFromApi() with async( When promise gets rejected ): ' + err)
      });
  }

  render(){
    componenteLista = this.getComponenteLista();
    return (
          <div>
            {componenteLista}
          </div>
        );
  }
}

export default RoomReservation;

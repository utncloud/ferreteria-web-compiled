// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../AddRoom/AddRoom.css';
import * as Yup from "yup";
import {ListHOC} from '../List/List';
import RoomService from '../../services/RoomService';

var service = null;

class AddRoom extends React.Component{
  
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        estaCargado: false,
        rooms: [],
        addNewRow:false
      };

      service = new RoomService();
    }

  onSubmit = async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
    service.insertRoom(values)
      .then(data => {
          this.setState({
            rooms: data
          });
          resetForm({})
          setStatus({success: true})
        })
      .catch(err =>{
        this.setState({
            error: err,
            estaCargado: true,
            rooms: []
        });
        setStatus({success: false})
        setSubmitting(false)
        setErrors({submit: err})
        console.log('Error from insertRoom() with async( When promise gets rejected ): ' + err)
      })
  }
  
  showForm(from){
    return (
      <Formik
        initialValues={{ room: "", capacity: 1, texto: "" }}
        validationSchema={Yup.object({
          room: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
            capacity: Yup.number()
            .min(1, "Must be equal or greater than 1")
            .required("Required")
        })}
        onSubmit={this.onSubmit}
      >
        {({errors, handleSubmit, handleChange, isSubmitting, isValid, status, values}) =>
          <div>
            <h2>Add new room</h2>
            <div className="divAddRoom">
                <Form
                  loading={isSubmitting}
                  success={!!status && !!status.success}
                  error={!!errors.submit}
                  onSubmit={handleSubmit}>
                    <div className="divForm">
                        <label htmlFor="room">Room</label>
                        <Field name="room" type="text" className="field"/>
                        <ErrorMessage name="room" />    
                    </div>
                    <div className="divForm">
                        <label htmlFor="capacity">Capacity</label>
                        <Field name="capacity" type="number"  className="field"/>
                        <ErrorMessage name="capacity" />
                    </div>
                    <div className="divForm">
                      <button type="submit">Insertar Sala</button>
                    </div>
                </Form>
            </div>
          </div>
        }
      </Formik>
    );    
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
      })
  }

  getComponenteLista() {
    return (
      <ListHOC isOnlyList= {true} roomsList={this.state.rooms} cambioEstadoRoom={this.cambioEstadoRoom} ></ListHOC>
    );
  } 

  render(){
    return (
          <div>
            {this.showForm()}
            {this.getComponenteLista()}
          </div>
        );
  }
}

export default AddRoom;

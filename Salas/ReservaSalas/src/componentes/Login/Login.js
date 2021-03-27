import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import './Login.css';
import '../AddRoom/AddRoom.css';
import { inicioSesion, finSesion } from '../../redux/store/Login/LoginAction'
import { selectActiveUser, selectActiveValidSesion } from '../../redux/store/Login/LoginReducer';
import { connect } from 'react-redux';
import AuthService from '../../services/AuthService';
  
  const showForm = (onLoginClick)=>    
      <Formik
        initialValues={{ user: "", password: "" }}
        validationSchema={Yup.object({
          user: Yup.string()
            .min(5, "Must be equal or greater than 5")
            .required("Required"),
            password: Yup.string()
            .min(6, "Must be equal or greater than 6")
            .required("Required")
        })}
        onSubmit={onLoginClick}
      >
        {({errors, handleSubmit, handleChange, isSubmitting, isValid, status, values}) =>
          <div>
            <h2>Autentication</h2>
            <div className="divAddRoom">
                <Form
                  loading={isSubmitting}
                  success={!!status && !!status.success}
                  error={!!errors.submit}
                  onSubmit={handleSubmit}>
                    <div className="divForm">
                        <label htmlFor="user">User</label>
                        <Field name="user" type="text" className="field"/>
                        <ErrorMessage name="user" />    
                    </div>
                    <div className="divForm">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password"  className="field"/>
                        <ErrorMessage name="password" />
                    </div>
                    <div className="divForm">
                      <button disabled={!isValid} type="submit">Iniciar Sesión</button>
                    </div>
                </Form>
            </div>
          </div>
        }
      </Formik>

const cerrarSesionIniciadaTemplate = (user, eventoClick)=>(
    <div>
        <p>
          Hola! { user.emailname }
          <button onClick={ eventoClick }>
            Cerrar Sesión
          </button>
        </p>
    </div>
);

const Login = ({user, isSesionActive, inicioSesion, finSesion}) => {  
    
    const onLoginClick = async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
      let service = new AuthService();
      let objUser = {username: values.user, password: values.password};

      service.authUserFromApi(objUser)
      .then(data => {
          console.log("reading data");
          console.log(data);
          inicioSesion(data);
          resetForm({})
          setStatus({success: true})
        })
      .catch(err =>{
        setStatus({success: false})
        setSubmitting(false)
        setErrors({submit: err.message})
        console.log('Error from onLoginClick() with async( When promise gets rejected ): ' + err.message)
      });
    }

    const onLoginOffClick = (cb) => {
        finSesion();
        setTimeout(cb, 100); // falso proceso de autenticación  
    }

    let history = useHistory();
    
    const sesionTemplate = () => (isSesionActive ? (
                        cerrarSesionIniciadaTemplate (user, () => {
                            onLoginOffClick(() => history.push("/"));})
                    ) : (
                        showForm(onLoginClick)
                    )
        );

    return (
        <div>
            {sesionTemplate()}
        </div>        
    );
  }

  const mapStateToProps = state => {
    return {
      user: selectActiveUser(state),
      isSesionActive: selectActiveValidSesion(state)
    }
  }

export default connect(mapStateToProps, {inicioSesion, finSesion}) (Login);
import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { selectActiveValidSesion } from '../../redux/store/Login/LoginReducer';
import { connect } from 'react-redux';

const RutaPrivada = ({isSesionActive, children, ...rest}) =>  {
    return (
      <Route
        {...rest}
        render={({ location }) =>
            isSesionActive ? (children) : 
                (
                    <Redirect to={{
                        pathname: "/",
                        state: { from: location }
                      }}
                    />
                )
        }
      />
    );
  }

  const mapStateToProps = state => {
    return {
      isSesionActive: selectActiveValidSesion(state)
    }
  }

  export default connect(mapStateToProps) (RutaPrivada);
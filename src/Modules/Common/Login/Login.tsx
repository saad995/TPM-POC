import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

//Import Styles
import './Login.scss';

//Import Components
import LoginComponent from './CLogin';
import {Col, Container, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import logo_white from 'Assets/Icons/Logo_Transparent_White.png';

function LoginScreen ()
{
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
          history.push( location.pathname);
          // window.location.reload();
  }, [ location.pathname ] );
  
  const h = document.documentElement.scrollHeight;
  return (
    <Container fluid className="login-bg h-100">
       <img src={logo_white} className="mx-auto mb-3 login-logo" />
      <Row className="login-cont-row h-100">
        <Col className="transparent-cont" lg="4" md="6" xs="12">
        <LoginComponent/>
        </Col>
        <Col className="side-text d-none d-md-block" >
        <h3>Don't have an account?</h3>
        <h5>Subscribe right now to be able to use <strong>Pakistan Single Window portal.</strong></h5>
        <Link to="/subscription" className="mt-3">
              <p className="text-center">
              <strong>Create an account</strong>
              <FontAwesomeIcon icon={faArrowCircleRight} className="ml-2"/>
              </p>
            </Link>
        </Col>
      </Row>
      
    </Container>
  );
}


export default LoginScreen;

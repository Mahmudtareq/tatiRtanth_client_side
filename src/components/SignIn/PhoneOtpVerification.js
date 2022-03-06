import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import "./PhoneOtpVerification.css";
import { Link } from 'react-router-dom';
// import { setUpRecaptcha } from '../SignIn/SignIn.component.jsx';
import { setUpRecaptcha } from '../SignIn/SignIn.component.jsx'

const PhoneOtpVerification = ({setUpRecaptcha}) => {
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    // const { setUpRecaptcha} = setUpRecaptcha();
    const getOtp = (e) => {
        e.preventDefault();
         console.log(number);
        
    }

    return (
        <>
            <div className='p-4 box'>
                <h2 className='mb-2'>Firebase Phone Auth</h2>
                {error && <Alert variant='danger'>{ error}</Alert>}
                  <Form onSubmit={getOtp}>
                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <PhoneInput
                            defaultCountry='PH'
                            value={number}
                            onChange={setNumber}
                            placeholder="Enter phone number"
                        />
                        <div id='recaptcha-container'></div>
                    </Form.Group>
                    <div className='button-right'>
                        <Link to="/sign-in">
                             <Button variant='secondary'>Cancel</Button> &nbsp;
                        </Link>
                       
                        <Button variant='primary' type='submit'>Send OTP </Button>

                    </div>
                  </Form>

            </div>
        
        </>
        
    );
};

export default PhoneOtpVerification;
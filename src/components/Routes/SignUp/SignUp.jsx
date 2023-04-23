import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../../../src/firebase.config";

const auth = getAuth(app);

const SignUp = () => {
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("");
    const [terms, setTerms] = useState(false);

    // onSubmit handler
    const handleSignUp = e => {
        setErr("");
        setSuccess("");
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const pass = form.pass.value;
        console.log(name, email, pass);

        if (!/((?=.*[A-z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*]))/.test(pass)) {
            setErr("Please set your password with at least one uppercase letters, two number and one special characters.")
            return;
        };

        if (!terms) {
            setErr("Please accept terms and condition.")
            return;
        };

        // create user / sign up;
        createUserWithEmailAndPassword(auth, email, pass)
            .then(result => {
                const { user } = result;
                console.log(user);
                setSuccess("Sign Up successful.")

                updateUserProfileData(user, name);
                emailVerify(user);
            })
            .catch(err => {
                setErr(err.message);
            })
    };

    // update user profile
    const updateUserProfileData = (user, name) => {
        console.log(user, name);
        updateProfile(user, {
            displayName: name,
        })
            .then(() => {
                setName(name)
            })
            .catch(err => {
                setErr(err);
            })
    };

    //email verification
    const emailVerify = user => {
        sendEmailVerification(user)
            .then(() => {
                alert("Please check your email for verify your email address.");
            })
    };

    return (
        <div className='row row-cols-1 row-cols-md-2 mx-3'>
            <div className='w-25 mx-auto bg-secondary p-3 rounded my-5 text-white fw-semibold'>
                <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter name" name='name' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" name='email' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" name='pass' />
                        <small className='text-warning'>your password at least one uppercase letters, two number and one special characters.</small>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onClick={() => setTerms(!terms)} type="checkbox" label="Accept terms and condition." />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='fw-bold'>
                        Submit
                    </Button>
                </Form>

                <p className={err && 'text-danger text-center bg-white p-1 rounded my-3'}>{err}</p>
                <p className={success && 'text-success text-center bg-white p-1 rounded my-3'}>{success}</p>
            </div >

            <div className='my-5'>
                User Name: {name}
            </div>
        </div>
    );
};

export default SignUp;
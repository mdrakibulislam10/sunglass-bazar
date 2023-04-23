import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";
import app from "../../../../src/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();

const SignIn = () => {
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState({});
    const showPass = useRef();

    const { displayName, email, emailVerified } = user;

    // onSubmit handler
    const handleSignIn = e => {
        setErr("");
        setSuccess("");

        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const pass = form.pass.value;
        console.log(name, email, pass);

        // sign in user;
        signInWithEmailAndPassword(auth, email, pass)
            .then(result => {
                const { user } = result;
                setUser(user);
                console.log(user);
                setSuccess("Sign In successful.");
            })
            .catch(err => setErr(err.message))
    };

    //  show pass handler
    // const showPassHandler = () => showPass.current.type = "text";

    // sign in with google
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const { user } = result;
                setUser(user);
                setSuccess("Sign In with google successful.");
            })
            .catch(err => setErr(err.message))
    };

    // sign in with twitter
    const handleTwitterSignIn = () => {
        signInWithPopup(auth, twitterProvider)
            .then(result => {
                const { user } = result;
                setUser(user);
                console.log(user);
                setSuccess("Sign In with twitter successful.");
            })
            .catch(err => setErr(err.message))
    };

    // sign in with github
    const handleGitHubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const { user } = result;
                setUser(user);
                console.log(user);
                setSuccess("Sign In with github successful.");
            })
            .catch(err => setErr(err.message))
    };

    return (
        <section className='row row-cols-1 row-cols-md-2 mx-3 mb-5'>
            <div>
                <div className='w-50 mx-auto bg-secondary p-3 rounded mt-5 mb-2 text-white fw-semibold'>
                    <Form onSubmit={handleSignIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" name='email' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required ref={showPass} type="password" placeholder="Password" name='pass' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            {/* <Form.Check onClick={showPassHandler} type="switch" label="Show password" /> */}
                            <Form.Check onClick={() => showPass.current.type = "text"} type="radio" label="Show password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='fw-bold'>
                            Submit
                        </Button>
                    </Form>

                    <p className={err && 'text-danger text-center bg-white p-1 rounded my-3'}>{err}</p>
                    <p className={success && 'text-success text-center bg-white p-1 rounded my-3'}>{success}</p>

                </div>

                <div className='text-center'>
                    <h4 className='text-info'>or</h4>
                    <div className='mt-2'>
                        <button onClick={handleGoogleSignIn} className='btn btn-warning px-5 text-dark fs-5 fw-bold'>Sign In with Google</button>
                        <br />
                        <br />
                        <button onClick={handleTwitterSignIn} className='btn btn-warning px-5 text-dark fs-5 fw-bold'>Sign In with Twitter</button>
                        <br />
                        <br />
                        <button onClick={handleGitHubSignIn} className='btn btn-warning px-5 text-dark fs-5 fw-bold'>Sign In with GitHub</button>
                        <br />
                        <br />
                        <button className='btn btn-warning px-5 text-dark fs-5 fw-bold'>Sign In with Facebook</button>
                    </div>
                </div>
            </div>

            <div className='my-5'>
                {
                    user &&
                    <>
                        <h4>Name: {displayName}</h4>
                        <p>Email: {email}</p>
                        <p className='text-success'>{emailVerified && "Verified User"}</p>
                    </>
                }
            </div>
        </section>

    );
};

export default SignIn;
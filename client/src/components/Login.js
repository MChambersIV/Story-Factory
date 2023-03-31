import React, { useContext, useState } from 'react';
import { GlobalContext } from '../App';
<<<<<<< HEAD
import { createUser } from '../utils/api';
=======
import { createUser, loginUser } from '../utils/API';
import Auth from '../utils/auth';
>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f



export default function Login() {

    const globalState = useContext(GlobalContext);

    
    // console.log(storyShow.loginShow);

    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupUserName, setSignupUserName] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [email, setEmail] = useState('');


    const loginStyle = {
        display: 'flex',
        position: 'fixed',
        top: "100px",
        left: "10vw",
        border: "1px solid #ffffff",

        backgroundColor: '#000000bb',
        WebkitBackdropFilter: 'blur(6px)',
        MozBackdropFilter: 'blur(6px)',
        backdropFilter: 'blur(6px)',
        height: '300px',
        width: '80vw',
        padding: '20px',
        fontSize: '1.4em'

    }
    const divStyle = {
        width: '50%',
        marginLeft: '10%',
        marginRight: '10%',
    }

    const formStyle = {
        marginLeft: '10%',
    }
    const dividerStyle = {
        height: '100%',
        border: '.5px solid #ffffff66'
    }


    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = e.target;

      

        switch (name) {
            case 'loginUserName' : {
                return setLoginUserName(value);
            }
            case 'loginPassword' : {
                return setLoginPassword(value);
            }
            case 'signupUserName' : {
                return setSignupUserName(value);
            }
            case 'signupPassword' : {
                return setSignupPassword(value);
            }
            case 'email' : {
                return setEmail(value);
            }
            default: return;
        }
    
    };

    const handleLoginSubmit = async (event) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        const username = loginUserName;
        const password = loginPassword;

        const data = { username, password }

        try { 
            const response = await loginUser(data);

            if (!response.ok) {
                throw new Error('BORKED')
            }

            const {token, user } = await response.json();
            console.log(user);
            Auth.login(token);
        } catch(error) {
            console.error(error)
        }

        
    
        // Alert the user their first and last name, clear the inputs
        // alert(`Hello ${userName}`);
        setLoginUserName('');
        setLoginPassword('');
        globalState.setGlobalState((prevState) => ({...prevState, loginShow: false}));
    };

    const handleSignupSubmit = async (event) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
<<<<<<< HEAD
        e.preventDefault();
        const username = signupUserName;
        const password = signupPassword;

        console.log([username, password, email]);

        createUser([username, password, email]);

       
    
=======
        event.preventDefault();
        
        const username = signupUserName;
        const password = signupPassword;

        const data =  { username, email, password }
        try {
            const response = await createUser(data);
            
            if (!response.ok) {
                throw new Error('Error occurred!');
            }

            console.log(response)
            
            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);
        } catch (error) {
            console.log(error);
            
        }

>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f
        // Alert the user their first and last name, clear the inputs
        // alert(`Hello ${userName}`);
        setSignupUserName('');
        setSignupPassword('');
        setEmail('');
        globalState.setGlobalState((prevState) => ({...prevState, loginShow: false}));
    };


    //   console.log(this);
    return (
   
        <section style={loginStyle}>

        <div style={divStyle}>
        <p>Welcome Back Writers!</p>
        <form className="form" style={formStyle}>
            <input
            value={loginUserName}
            name="loginUserName"
            onChange={handleInputChange}
            // onChange={orThisWayForBoth}
            type="text"
            placeholder="userName"
    
            /><br />
            <input
            value={loginPassword}
            name="loginPassword"
            onChange={handleInputChange}
            // onChange={orThisWayForBoth}
            type="password"
            placeholder="password"

            /><br />
            <button type="button" onClick={handleLoginSubmit}>
            Login!
            </button>
      </form>
        </div>

        <div style={dividerStyle}></div>

        <div style={divStyle}>
        <p>Not a member? Join the Community!</p>
      <form className="form" style={formStyle}>
        <input
          value={signupUserName}
          name="signupUserName"
          onChange={handleInputChange}
          // onChange={orThisWayForBoth}
          type="text"
          placeholder="userName"
  
        /><br />
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          // onChange={orThisWayForBoth}
          type="email"
          placeholder="email"

        /><br />
        <input
          value={signupPassword}
          name="signupPassword"
          onChange={handleInputChange}
          // onChange={orThisWayForBoth}
          type="password"
          placeholder="password"

        /><br />
        <button type="button" onClick={handleSignupSubmit}>
          Join Us!
        </button>
      </form>
      </div>
        </section>
   
    );
  }
import Snippet from './Snippet';
import Create from './Create';
import { useState, useEffect, createContext } from 'react';
import { getAllStories, getMe, getSnippetByUserName } from '../utils/API';
import Auth from '../utils/auth';
// import { params } from 'react-router-dom';


export const HomeContext = createContext();


const textColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",

]

const homeStyle = {

 width: '80%',
//  backgroundColor: '#222222',
 marginLeft: '10%',
 marginTop: '3%',
}

const divStyle = {
    border: '1px solid #ffffff',
    padding: '20px',
}
const outLine = {
    border: '1px solid #222222',
    padding: '10px',
}

const buttonDivStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px',
    marginTop: '50px',
}
const buttonStyle = {
    fontSize: '2em',
    padding: '0.5em'
}

export default function Home() {
    const [createStart, setCreateStart] = useState(false);
    // user result 96
    const [userResult, setUserResult] = useState(0);
    const [userSnippets, setUserSnippets] = useState(null);
   
    // console.log(createStart)
    const returnUser = async () => {
        
        try {
            const token = Auth.retrieveToken();

            console.log("return user token:", token)

            if(!token) {
                console.log('Problem with token found.')
            }

            const response = await getMe(token);

            const result = await response.json();

            // console.log("console log of result: ", result);

            //hands off response 116
            setUserResult(result);
        } catch (error){
            console.error(error);
        }
    }
    const getUserSnippets = async () => {
        try {
            const response = await getSnippetByUserName(userResult.username);
            
            
            const result = await response.json();
            // console.log(result);
            setUserSnippets(result);
        } catch (error){
            console.error(error);
        }
    }

    //calls return user function 122
    // returnUser();
    useEffect(()=>{

        returnUser();
        
    }, [createStart]);

    useEffect(()=>{
        getUserSnippets();

    }, [userResult] )



    // console.log("xxx", userSnippets);

    
    return (
        <section style={homeStyle}>
            
            {createStart ?
                <HomeContext.Provider value={ {createStart, setCreateStart} }>
                    <Create user={userResult.username} /> 
                </HomeContext.Provider>
                :
                //  This is the name rendered to the page 133
                <div>                  
                    <h1>Welcome back {userResult.username}</h1>
                    <div style={buttonDivStyle}>
                        <button style={buttonStyle} onClick={() => setCreateStart(true)}>Contribute to a Story!</button>
                    </div>

                    <div style={divStyle}>
                        <h2>Contributions</h2>
                        {userSnippets?.map((snippet, index) => (
                            <div key={index}>
                         
                            <Snippet story={snippet.storyname} text={snippet.snippetText} color={textColors[6]} />
                            </div>
                        ))}
                    </div>
                </div>
            }
            


        </section>
    );
  }
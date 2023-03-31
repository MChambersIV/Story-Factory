import Prompt from './create-components/Prompt';
import Rules from './create-components/Rules';
import Story from './Story';
// import Confirm from './create-components/Confirm';
import LastSnippet from './create-components/LastSnippet';
import TextField from './create-components/TextField';
import Stats from './create-components/Stats';
import { getAllStories, postSnippet } from '../utils/API';

import { HomeContext } from './Home';


import { useState, createContext, useContext, useEffect } from 'react';


export const CreateContext = createContext();


const createStyle = {

//  width: '80%',
//  backgroundColor: '#222222',
//  marginLeft: '10%',
//  marginTop: '3%',
}

const divStyle = {
    border: '1px solid #ffffff',
    padding: '20px',
}
const buttonStyle = {
    fontSize: '1.4em',
    marginRight: '20px',
}
const disabledButtonStyle = {
    fontSize: '1.4em',
    color: "#ef4444",
    borderColor: "#ef4444",
    marginRight: '20px',
}
const displayInline = {
    display: 'flex'
}

const timerStyle = {
    color: "#ef4444",
    fontSize: '2em',
}



export default function Create({user}) {
    const homeState = useContext(HomeContext);
    const [textFieldContents, setTextFieldContents] = useState('');
    const [showPassage, setShowPassage] = useState(false);
    const [passageTimer, setPassageTimer] = useState(0);
    const [writingTimer, setWritingTimer] = useState(0);
    const [passageIntervalId, setPassageIntervalId] = useState(0);
    const [writingIntervalId, setWritingIntervalId] = useState(0);
    const [timesUp, setTimesUp] = useState(false)
    const [timedWordTotal, setTimedWordTotal] = useState(0);
    const [currentStory, setCurrentStory] = useState(0);
    const [finshedStory, showFinshedStory] = useState(false);
   
    console.log(textFieldContents);
    const getRandomStory = async () => {
        
        try {
            const response = await getAllStories();
            
            const result = await response.json();

            const randomNumber = Math.floor(Math.random() * result.length);

            setCurrentStory(result[randomNumber]);

        } catch (error){
            console.error(error);
        }
    }
    const startWriting = () => {
        setWritingTimer(6);
        const timer = setInterval(()=>{
            setWritingTimer(timer => timer-1);
            
            
        },1000);
        setWritingIntervalId(timer);
    }
    const startGame = () => {
        setShowPassage(true);
        setPassageTimer(2);
        const timer = setInterval(()=>{
            setPassageTimer(timer => timer-1);
            
            
        },1000);
        setPassageIntervalId(timer);
    }

    const submitSnippet = () => {
        postSnippet({
            "snippetText": textFieldContents,
	        "username": user,
            "storyname" : currentStory.storyname
        }).then(result => {
            //  (console.log(result));
            //  homeState.setCreateStart(false);
            showFinshedStory(true);
             
        });
    }

    if (passageIntervalId && !passageTimer) {
        clearInterval(passageIntervalId);
    }
    if (writingIntervalId && !writingTimer && !timesUp) {
        clearInterval(writingIntervalId);
        setTimesUp(true);
        setTimedWordTotal(textFieldContents.trim().split(/\s+/).length);
    }

    useEffect(()=>{

        getRandomStory();
        
    }, [])

 
    const wordCountDifference = textFieldContents.trim().split(/\s+/).length - timedWordTotal;


    console.log(currentStory)
    return (
        <CreateContext.Provider value={ {textFieldContents, setTextFieldContents} }>
        {!finshedStory ?
        <section style={createStyle}>
            <h1>Are You Ready? Here is your Prompt</h1>

            <div style={divStyle}>
            
                <Prompt prompt={currentStory.prompt} title={currentStory.storyname}/>

                {!showPassage ?
                <div>
                    <Stats numContributions={currentStory.snippetCount}/>
                    <Rules />
                
                    <button style={buttonStyle} onClick={startGame}>I want to write about this!</button>
                    <button style={buttonStyle} onClick={() => (homeState.setCreateStart(false))}>Try a different prompt</button>
                </div> :
                <div>
                    
                    {passageTimer ?
                        <div>
                            <LastSnippet text={currentStory.snippets[currentStory.snippetCount-1]?.snippetText}/>
                            <p style={timerStyle}>{passageTimer} seconds left</p> 
                        </div>
                        :
                        <div>
                            {!writingTimer ?
                            
                                <div>
                                    {!timesUp ? 
                                        <div>
                                            <button style={buttonStyle} onClick={startWriting}>Ready?</button>
                                            <button style={buttonStyle} onClick={() => (homeState.setCreateStart(false))}>Start Over with a New Prompt</button>
                                        </div>
                                        : 
                                        <div>
                                            You wrote {timedWordTotal} words. You may now proofread your snippet, but you can only add or subtract 5 words.
                                            <TextField />
                                            {/* { wordCountDifference } */}
                                            { Math.abs(wordCountDifference) <= 5 ?
                                                <div>


                                                    <button style={buttonStyle} onClick={() => submitSnippet()}>All Done!</button> 


                                                    <button style={buttonStyle} onClick={() => (homeState.setCreateStart(false))}>Start Over with a New Prompt</button>
                                                </div>
                                                :
                                                <div style={displayInline}>
                                                    { wordCountDifference > 5 ?
                                                        <div>
                                                            { wordCountDifference > 6 ?
                                                                <button style={disabledButtonStyle}>Too Many Words! (delete {wordCountDifference - 5} words)</button>
                                                            : 
                                                                <button style={disabledButtonStyle}>Too Many Words! (delete {wordCountDifference - 5} word)</button>
                                                            }
                                                        </div>
                                                        
                                                        :
                                                        <div>
                                                            { Math.abs(wordCountDifference) > 6 ?
                                                                <button style={disabledButtonStyle}>Too Few Words! (add {Math.abs(wordCountDifference + 5)} words)</button>
                                                            : 
                                                                <button style={disabledButtonStyle}>Too Few Words! (add {Math.abs(wordCountDifference + 5)} word)</button>
                                                            }
                                                        </div>

                                                       
                                                    
                                                    }
                                                    <button style={buttonStyle} onClick={() => (homeState.setCreateStart(false))}>Start Over with a New Prompt</button>
                                                </div>
                                                
                                            }
                                            
                                        </div>
                                    }
                                </div>
                                
                            :   <div>
                                    <p style={timerStyle}>{writingTimer} seconds left</p>
                                    <TextField />
                                </div>
                            }
                        </div>
                    }

                </div>
                }

            </div>
            
            


        </section>
        :
        <>
            <Story storyName={currentStory.storyname}/>
            <button style={buttonStyle} onClick={() => (homeState.setCreateStart(false))}>Go Back Home!</button>
        </>
        }
        </CreateContext.Provider>
    );
  }
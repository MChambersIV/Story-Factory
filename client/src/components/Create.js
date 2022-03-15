import Prompt from './create-components/Prompt';
import Rules from './create-components/Rules';
// import Confirm from './create-components/Confirm';
import LastSnippet from './create-components/LastSnippet';
import TextField from './create-components/TextField';
import Stats from './create-components/Stats';
import { postSnippet } from '../utils/API';

import { useState, createContext } from 'react';

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
    
    const [textFieldContents, setTextFieldContents] = useState('');
    const [showPassage, setShowPassage] = useState(false);
    const [passageTimer, setPassageTimer] = useState(0);
    const [writingTimer, setWritingTimer] = useState(0);
    const [passageIntervalId, setPassageIntervalId] = useState(0);
    const [writingIntervalId, setWritingIntervalId] = useState(0);
    const [timesUp, setTimesUp] = useState(false)
    const [timedWordTotal, setTimedWordTotal] = useState(0);
   
    console.log(textFieldContents);
    const startWriting = () => {
        setWritingTimer(12);
        const timer = setInterval(()=>{
            setWritingTimer(timer => timer-1);
            
            
        },1000);
        setWritingIntervalId(timer);
    }
    const startGame = () => {
        setShowPassage(true);
        setPassageTimer(12);
        const timer = setInterval(()=>{
            setPassageTimer(timer => timer-1);
            
            
        },1000);
        setPassageIntervalId(timer);
    }

    const submitSnippet = () => {
        postSnippet({
            "snippetText": textFieldContents,
	        "username": "garrett"
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

 
    const wordCountDifference = textFieldContents.trim().split(/\s+/).length - timedWordTotal;

    return (
        <CreateContext.Provider value={ {textFieldContents, setTextFieldContents} }>
        <section style={createStyle}>
            <h1>Are You Ready? Here is your Prompt</h1>

            <div style={divStyle}>
            
                <Prompt />

                {!showPassage ?
                <div>
                    <Stats />
                    <Rules />
                
                    <button style={buttonStyle} onClick={startGame}>I want to write about this!</button>
                    <button style={buttonStyle}>Try a different prompt</button>
                </div> :
                <div>
                    
                    {passageTimer ?
                        <div>
                            <LastSnippet />
                            <p style={timerStyle}>{passageTimer} seconds left</p> 
                        </div>
                        :
                        <div>
                            {!writingTimer ?
                            
                                <div>
                                    {!timesUp ? 
                                        <div>
                                            <button style={buttonStyle} onClick={startWriting}>Ready?</button>
                                            <button style={buttonStyle}>Start Over with a New Prompt</button>
                                        </div>
                                        : 
                                        <div>
                                            You wrote {timedWordTotal} words. You may now proofread your snippet, but you can only add or subtract 5 words.
                                            <TextField />
                                            {/* { wordCountDifference } */}
                                            { Math.abs(wordCountDifference) <= 5 ?
                                                <div>


                                                    <button style={buttonStyle} onClick={() => submitSnippet()}>All Done!</button> 


                                                    <button style={buttonStyle}>Start Over with a New Prompt</button>
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
                                                    <button style={buttonStyle}>Start Over with a New Prompt</button>
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
        </CreateContext.Provider>
    );
  }
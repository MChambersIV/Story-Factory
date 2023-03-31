import { useState, useContext } from 'react';
import { CreateContext } from '../Create';


export default function TextField() {
    
    const textFieldContents = useContext(CreateContext);

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        e.preventDefault();
        const { value } = e.target;
        console.log(value);
        textFieldContents.setTextFieldContents(value);

        // return setTextField(value)
    
    };

    const textareaStyle = {
        width: 'calc(100% - 20px)',
        height: '200px',
        backgroundColor: '#ffffff04',
        resize: 'none',
        font: 'inherit',
        color: '#ffffff',
        padding: '10px',
        WebkitBackdropFilter: 'blur(2px)',
        backdropFilter: 'blur(2px)',
    }
    
    return (
        
        <section>
         

        
            <form>
                <textarea onChange={handleInputChange} style={textareaStyle} name="textBox" defaultValue={textFieldContents.textFieldContents}></textarea>

            </form>

    
     
            
            


        </section>
    );
  }
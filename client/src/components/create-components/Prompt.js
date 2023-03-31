
const pStyle = {
    fontSize: '1.4em'
}

export default function Prompt({prompt, title}) {
    return (
        <section>
         
            <h2>{title}</h2>
          
            <h3 style={pStyle}>{prompt}...</h3>

            



    
     
            
            


        </section>
    );
  }
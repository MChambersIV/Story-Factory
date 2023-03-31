


export default function LastSnippet({text}) {
    return (
        <section>
         

          {text ?
            <h3>{text}</h3> :
            <h3>There are no contributions yet! Start us off!</h3>
          }



    
     
            
            


        </section>
    );
  }
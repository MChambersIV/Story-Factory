const divStyle = {
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

export default function CreateButton() {
   


    return (
        <div style={divStyle}>

            <button style={buttonStyle}>Contribute to a Story!</button>
        
      
        </div>
    );
  }
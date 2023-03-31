// import '../index.css';
import Nav from './Nav';
import { GlobalContext } from '../App';
import { useContext } from 'react';
import Typewriter from 'typewriter-effect'

const headerStyle = {
    paddingTop: "10px",
    display: "flex",
    width: "100%",
    // fontFamily: "Typewriter",
}
const titleStyle = {
        
    fontSize: "4em",
    paddingLeft: "30px",
    // backgroundColor: "#000000",
    whiteSpace: "nowrap"
        
}

export default function Header() {

    const globalState = useContext(GlobalContext);


    return (
        <header style={headerStyle}>
            <div style={titleStyle} onClick={() => globalState.setGlobalState((prevState) => ({...prevState, homeShow: false}))}>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString('Story Factory')
                        .start();
                    }}/>
            </div>
            <Nav />
      
        </header>
    );
  }
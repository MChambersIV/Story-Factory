import Particles from "react-tsparticles";

const particleBackground =() =>{
    return (
        <div className="app">
            <Particles 
            options={{
                background:{
                    color: 'black',
                },
                fpsLimit: 60,
                interactive: {
                    detectsOn: 'canvas',
                    events: {
                        resize:true,
                    },
                },
                particles:{
                    color: {
                        value: 'A4B8F6',
                    },
                    number: {
                        density:{ 
                        enable: true,
                        area: 1200
                        },
                        limit: 0,
                        value: 400,
                    },
                    opacity:{
                        animation:{
                            enable: true,
                            minimumValue: 0.05,
                            speed: 1,
                            sync: false
                        },
                        random: {
                            enable: true,
                            minimumValue: 0.05,
                        },
                        value: 1
                    },
                    shape:{
                        type: 'circle'
                    },
                    size:{
                        random: {
                            enable: true,
                            minimumValue: 0.5
                        },
                        value: 1,
                    }
                }
            }}/>
        </div>
    )
}

export default particleBackground

const sectionStyle = {
 
}

export default function Stats({numContributions}) {
    return (
        <section style={sectionStyle}>

            There have been [{numContributions}] contributions, leaving [{10-numContributions}] more to go.
         
        
        </section>
    );
  }
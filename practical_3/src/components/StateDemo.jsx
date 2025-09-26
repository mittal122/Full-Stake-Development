import { Component } from "react";
class StateDemo extends Component{
    constructor(){
        super()
        this.state = {
            message : "CHARUSAT University!!!"
        }
    }
    changeMessage() {
        this.setState((prevState) => ({
            message:
                prevState.message === "CHARUSAT University!!!"
                    ? "NIRMA University!!!"
                    : "CHARUSAT University!!!"
        }));
    }   
    render(){
        return(
            <div>
                <h1>Welcome to --- {this.state.message}</h1>
                <button onClick={() => this.changeMessage()}>Click Me</button>
            </div>
        )
    }
}
export default StateDemo
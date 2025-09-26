import { Component } from "react";
import './style/style.css';
class Counter extends Component{
    constructor(){
        super()
        this.state = {
            count : 0
        }
    }
    incr(){
        this.setState({
            count : this.state.count + 1
        }, 
    () => {
        console.log("Callback", this.state.count)
    })
    console.log(this.state.count)
    }
    render(){
        return(
            <div className="counter-container">
                <h1 className="counter-title">
                    Count = {this.state.count}
                </h1>
                <button className="counter-btn" onClick={() => this.incr()}>Increment</button>
            </div>
        )
    }
}
export default Counter;
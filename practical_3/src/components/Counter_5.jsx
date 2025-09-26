import { Component } from "react";
import './style/style.css';
class Counter_5 extends Component{
    constructor(){
        super()
        this.state = {
            count : 0
        }
    }
    incr(){
        // this.setState((prevState) => {
        //     count : this.state.count + 1
        // }, 
    // () => {
    //     console.log("Callback", this.state.count)
    // })
    // console.log(this.state.count)

    this.setState(
        (prevState) => ({count: prevState.count + 1}), () => {
        console.log("Callback", this.state.count);
        }
    );
    console.log(this.state.count);
    }
    incrFive(){
        this.incr();
        this.incr();
        this.incr();
        this.incr();
        this.incr();
    }
    render(){
        return(
            <div className="counter-container">
                <h1 className="counter-title">
                    Count = {this.state.count}
                </h1>
                <button className="counter-btn" onClick={() => this.incrFive()}>Increment</button>
            </div>
        )
    }
}
export default Counter_5;
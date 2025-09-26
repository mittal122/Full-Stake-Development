import { Component } from "react";
import './Counter.css';

class Counter extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
    }

    // Method to reset the count to 0
    // This method sets the count state to 0 and logs the reset count
    // Reset the count to 0
    reset() {
        this.setState({
            count: 0
        });
        console.log("Reset", this.state.count);
    }

    // Method to increment the count by 1
    // This method uses setState to update the state asynchronously
    // The callback function logs the updated count after the state has been set
    // Increment by 1
    incr() {
        this.setState({
            count: this.state.count + 1
        },
            () => {
                console.log("Callback", this.state.count)
            })
        console.log(this.state.count);
    }

    // Method to decrement the count by 1
    // Similar to incr(), this method updates the count state and logs the updated count
    // Decrement by 1   
    decr() {
        this.setState({
            count: this.state.count - 1
        },
            () => {
                console.log("Callback", this.state.count)
            })
    }

    // Increment by 5
    // This method calls incr() 5 times, but due to the asynchronous nature of set
    // state, it will not immediately reflect the updated count
    // Instead, it will log the count after the last increment
    incrBy5() {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }), () => {
            console.log("Callback", this.state.count);
        });
        console.log(this.state.count);
    }
    incrFive() {
        this.incrBy5();
        this.incrBy5();
        this.incrBy5();
        this.incrBy5();
        this.incrBy5();
    }

    // Render method to display the counter and buttons
    render() {
        return (
            <div className="counter-container">
                <h1 className="counter-title">
                    Count = {this.state.count}
                </h1>
                <button className="counter-btn" onClick={() => this.reset()}>Reset</button>
                <button className="counter-btn" onClick={() => this.incr()}>Increment by 1</button>
                <button className="counter-btn" onClick={() => this.decr()}>Decrement by 1</button>
                <button className="counter-btn" onClick={() => this.incrFive()}>Increment by 5</button>
            </div>
        )
    }
}
export default Counter;
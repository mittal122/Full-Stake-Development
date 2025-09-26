import { Component } from "react";
class Demo2 extends Component{
    render(){
        return(
            <div>
                <h1>This is class Components</h1>
                <h1>Welcome to {this.props.dept}, {this.props.institute}</h1>
            </div>
        )
    }
}
export default Demo2
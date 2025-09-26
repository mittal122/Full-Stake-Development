// function Demo1(){
//     return <h5>Welcome This is Function Component!!</h5>
// }
// export default Demo1

const Demo1 = (props) => {
    console.log(props)
    return( 
        <div>
            <h2>This is Function components</h2>
            <h1>Welcome to {props.dept} ,{props.institute}</h1>
            <h3>Click On below button to Register in {props.dept} department</h3>
            <h4>{props.children}</h4>
        </div>
    )
}
export default Demo1
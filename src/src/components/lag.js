import React, { Component } from 'react'
import {Card, Input, Button, Table} from 'antd';
import 'antd/dist/antd.css';

const InputStyle = {
    background: "#393E46",
    fontSize: "20px"

};
var columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];
var x, y, tableTag,  interpolatePoint, tempTag, fx

class lag extends Component {
    
    constructor() {
        super();
        x = []
        y = []
        interpolatePoint = []
        tempTag = []
        tableTag = []
        this.state = {
            nPoints: 0,
            X: 0,
            interpolatePoint: 0,
            showInputForm : true,
            showInputButton: true,
            showTableInput: false,
            showTableButton: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.lagrange = this.lagrange.bind(this);
    
    }  
    createTableInput(n) {
        for (var i=1 ; i<=n ; i++) {
            x.push(<Input style={{
                width: "100%",
                height: "50%", 
                backgroundColor:"#393E46", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                fontSize: "18px",
            }}
            id={"x"+i} key={"x"+i} placeholder={"x"+i}/>);
            y.push(<Input style={{
                width: "100%",
                height: "50%", 
                backgroundColor:"#393E46", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                fontSize: "18px",
            }} 
            id={"y"+i} key={"y"+i} placeholder={"y"+i}/>);   
            tableTag.push({
                no: i,
                x: x[i-1],
                y: y[i-1]
            });
        }



        this.setState({
            showInputForm: false,
            showInputButton: false,
            showTableInput: true,
            showTableButton: true
        })
    }
    createInterpolatePointInput(){
        for (var i=1 ; i<=this.state.interpolatePoint ; i++) {
            tempTag.push(<Input style={{
                width: "14%",
                height: "50%", 
                backgroundColor:"#393E46", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                fontSize: "18px",
               
            }} 
            id={"p"+i} key={"p"+i} placeholder={"p"+i} />)
        }
    }
    initialValue() {
        x = []
        y = []
        for (var i=1 ; i<=this.state.nPoints ; i++) {
            x[i] = parseFloat(document.getElementById("x"+i).value);
            y[i] = parseFloat(document.getElementById("y"+i).value);
        }
        for (i=1 ; i<=this.state.interpolatePoint ; i++) {
            interpolatePoint[i] = parseFloat(document.getElementById("p"+i).value);
        }
    }
    L(X, index, n) {
        var numerate = 1, denominate = 1;
        for (var i=1 ; i<=n ; i++) {
            if (i !== index) {
                numerate *= x[i]-X;
                denominate *= x[i] - x[index];
            }
        } 
        console.log(numerate/denominate)
        return parseFloat(numerate/denominate);
    }

    lagrange(n, X) {
        fx = 0
        this.initialValue()
        for (var i=1 ; i<=n ; i++) {
            fx += this.L(X, i, n)*y[i];
        }
        this.setState({
            showOutputCard: true
        })

    } 


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <div className="card bg-dark text-white">
                  <label className="alert">
                    <br/><div className="alert alert-info ">Lagrange Polynomials (Linear) </div>
                <div>
                    <Card
                      bordered={true}
                      style={{ width: 400, background: "#393E46", color: "#FFFFFFFF", float:"left"}}
                      onChange={this.handleChange}
                    >
                        {this.state.showTableInput && 
                        <div>
                            <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontSize: "18px" , overflowY: "scroll", minWidth: 120, maxHeight: 300}}></Table>
                            <br/><h2>interpolatePoint {parseInt(this.state.interpolatePoint) === 2 ? "(Linear)": 
                                                       "(Linear)"}</h2>{tempTag}
                        </div>}
                        
                        {this.state.showInputForm && 
                            <div>
                                <h5>Number of points(n)</h5><Input size="large" name="nPoints" style={InputStyle}></Input>
                                <h5>X</h5><Input size="large" name="X" style={InputStyle}></Input>
                                <h5>interpolatePoint</h5><Input size="large" name="interpolatePoint" style={InputStyle}></Input>
                            </div> 
                        }
                        <br></br>
                        {this.state.showInputButton && 
                            <Button id="dimention_button" onClick= {
                                ()=>{this.createTableInput(parseInt(this.state.nPoints));
                                this.createInterpolatePointInput()}
                            }  
                                style={{background: "#278EA5", fontSize: "15px",}}>
                                Submit<br></br>
                            </Button>
                        }
                        {this.state.showTableButton && 
                            <Button 
                                id="matrix_button"  
                                style={{background: "#278EA5", fontSize: "15px"}}
                                onClick={()=>this.newton_difference(parseInt(this.state.interpolatePoint), parseFloat(this.state.X))}>
                                Submit
                            </Button>
                        }
                        
                    </Card>
                    

                    {this.state.showOutputCard &&
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "50%", border: "2px solid black", background: "#393E46 none repeat scroll 0% 0%", color: "white", float: "center"}}
                        >
                        <p style={{fontSize: "20px"}}>{fx}</p>
                            
                        </Card>                        
                    }

                   
                </div>

                
            </label>
            
        
            </div>
        );
    }
}
export default lag;
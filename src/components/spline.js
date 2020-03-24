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
var x = [], y = [], tableTag = [], answer

class spline extends Component {
    
    constructor() {
        super();
        this.state = {
            nPoints: 0,
            X: 0,
            showInputForm : true,
            showInputButton: true,
            showTableInput: false,
            showTableButton: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
    
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
    initialValue(X) {
        x = []
        y = []
        for (var i=0 ; i<this.state.nPoints ; i++) {
            x[i] = parseFloat(document.getElementById("x"+(i+1)).value);
            y[i] = parseFloat(document.getElementById("y"+(i+1)).value);
        }
        answer = this.spline(X, x, y)
    }
    spline(x, xs, ys) {
        var ks = xs.map(function(){return 0})
        ks = this.getNaturalKs(xs, ys, ks)
        var i = 1;
        while(xs[i]<x) i++;
        var t = (x - xs[i-1]) / (xs[i] - xs[i-1]);
        var a =  ks[i-1]*(xs[i]-xs[i-1]) - (ys[i]-ys[i-1]);
        var b = -ks[i]*(xs[i]-xs[i-1]) + (ys[i]-ys[i-1]);
        var q = (1-t)*ys[i-1] + t*ys[i] + t*(1-t)*(a*(1-t)+b*t);
        console.log(q)
        this.setState({
            showOutputCard: true
        })

        return q;
      }
      
    getNaturalKs (xs, ys, ks) {
        var n = xs.length-1;
        var A = this.zerosMat(n+1, n+2);
          
        for(var i=1; i<n; i++)  
        {
          A[i][i-1] = 1/(xs[i] - xs[i-1]);
          A[i][i] = 2 * (1/(xs[i] - xs[i-1]) + 1/(xs[i+1] - xs[i])) ;
          A[i][i+1] = 1/(xs[i+1] - xs[i]);
          A[i][n+1] = 3*( (ys[i]-ys[i-1])/((xs[i] - xs[i-1])*(xs[i] - xs[i-1]))  +  (ys[i+1]-ys[i])/ ((xs[i+1] - xs[i])*(xs[i+1] - xs[i])) );
        }
        
        A[0][0] = 2/(xs[1] - xs[0]);
        A[0][1] = 1/(xs[1] - xs[0]);
        A[0][n+1] = 3 * (ys[1] - ys[0]) / ((xs[1]-xs[0])*(xs[1]-xs[0]));
        
        A[n][n-1] = 1/(xs[n] - xs[n-1]);
        A[n][n] = 2/(xs[n] - xs[n-1]);
        A[n][n+1] = 3 * (ys[n] - ys[n-1]) / ((xs[n]-xs[n-1])*(xs[n]-xs[n-1]));
        
        return this.solve(A, ks);    
      }
      
      solve (A, ks) {
        var m = A.length;
        for(var k=0; k<m; k++)  
        {
          // pivot for column
          var i_max = 0; var vali = Number.NEGATIVE_INFINITY;
          for(var i=k; i<m; i++) if(A[i][k]>vali) { i_max = i; vali = A[i][k];}
          this.swapRows(A, k, i_max);    
          
          // for all rows below pivot
          for(i=k+1; i<m; i++)
          {
            for(var j=k+1; j<m+1; j++)
              A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
              A[i][k] = 0;
          }
        }
        for(i=m-1; i>=0; i--)
        {
          var v = A[i][m] / A[i][i];
          ks[i] = v;
          for(j=i-1; j>=0; j--) 
          {
            A[j][m] -= A[j][i] * v;
            A[j][i] = 0;
          }
        }
        console.log(A)
        return ks;
      }
      
    zerosMat (r,c) {
        var A = []; 
        for(var i=0; i<r; i++) {
          A.push([]); 
          for(var j=0; j<c; j++) A[i].push(0);
        } 
        return A;
    }
      
    swapRows (m, k, l) {
        var p = m[k]; m[k] = m[l]; m[l] = p;
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
                    <br/><div className="alert alert-info ">Spline Interpolation</div>
                <div>
                    <Card
                      bordered={true}
                      style={{ width: 400 , background: "#393E46", color: "#FFFFFFFF", float:"left"}}
                      onChange={this.handleChange}
                    >
                        {this.state.showTableInput && 
                        <div>
                            <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{fontSize: "18px" , overflowY: "scroll", minWidth: 120, maxHeight: 300}}>
                            
                            </Table>
                        </div>}
                        
                        {this.state.showInputForm && 
                            <div>
                                <h5>Number of points(n)</h5><Input size="large" name="nPoints" style={InputStyle}></Input>
                                <h5>X</h5><Input size="large" name="X" style={InputStyle}></Input>
                            </div> 
                        }
                        <br></br>
                        {this.state.showInputButton && 
                            <Button id="dimention_button" onClick= {
                                ()=>{this.createTableInput(parseInt(this.state.nPoints))}
                                }  
                                style={{background: "#278EA5", fontSize: "15px"}}>
                                Submit<br></br>
                                </Button>
                        }
                        {this.state.showTableButton && 
                            <Button 
                                id="matrix_button"  
                                style={{background: "#278EA5", fontSize: "15px" }}
                                onClick={()=>this.initialValue(parseFloat(this.state.X))}>
                                Submit
                            </Button>
                        }
                        
                    </Card>
                    

                    {this.state.showOutputCard && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "50%", border: "2px solid black", background: "#393E46 none repeat scroll 0% 0%", color: "white", float: "center"}}
                        id="outputCard"
                        >
                        <p style={{fontSize: "24px", fontWeight: "bold"}}>X = {answer}</p>
                        </Card>
                    }

                   
                </div>

            </label>
            </div>
        );
    }
}
export default spline;

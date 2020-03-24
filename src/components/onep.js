import React from "react"
import Table from 'react-bootstrap/Table'
import {compile} from 'mathjs'
import { Collapse } from "react-bootstrap"
var labelBic=[]

class onep extends React.Component{
    constructor(props){
        super(props)
        this.state={
          SumX:"",
          SumG:"",
          errro:"",
          talang:false
        }
        this.setSumX=this.setSumX.bind(this);
        this.setSumG=this.setSumG.bind(this);
    }
    setSumX(event){
        this.setState({SumX:event.target.value})
    }
    setSumG(event){
        this.setState({SumG:event.target.value})
    }
    runfun(event){
        if(event){
            labelBic.length=0
           this.fun()
        }
        this.setState({talang:event})   
    }
    showfun(){
        return labelBic
    }
    fun(){
        var one=compile(this.state.SumG)
        var sumx=parseFloat(this.state.SumX)
        var scope={x:sumx}
        var sumg=one.evaluate(scope)
        var error=(sumg-sumx)/sumg
        labelBic.push(<tr>
            <td>0</td>
            <td>{sumx}</td>
            <td>{error}</td>
        </tr>)
        sumx=sumg
        var i=1
        while(error>0.000001){
            scope={x:sumx}
            sumg=one.evaluate(scope)
            error=((sumg-sumx)/sumg)*100
            labelBic.push(<tr>
                <td>{i}</td>
                <td>{sumx}</td>
                <td>{error}</td>
            </tr>)
            sumx=sumg
            i++
            if(i>50){
                labelBic.push(<tr>
                    <td colSpan="3">Infinity</td>
                </tr>)
                break
            }
        }
    }
    render(){
        const styles={
			width: "250px"
        }
        const styles2={
                width: "200px"
        }
        return(
            <div className="card   bg-dark text-dark">
                <label className="alert">
                    <br/><div className="alert alert-info ">One-Point Iteration Method</div>
                    <br/>
                    <div className="input-group" >
                        <div className="input-group-prepend"><span className="input-group-text">G(x)</span></div>
                            <input type="text" style={styles} value={this.state.SumG} onChange={this.setSumG}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">X</span></div>
                                <input type="number" style={styles2} value={this.state.SumX} onChange={this.setSumX}/>
                        </div><br/>
                        <button onClick={()=>this.runfun(true)} className="btn btn-info ">sum</ button>
                </label>
                <Collapse in={this.state.talang}><Table>
                    <thead class= " bg-dark text-white">
                        <tr>
                        <th>Iteration</th>
                        <th>X</th>
                        <th>Y</th>
                        </tr>
                    </thead>
                    <tbody class= " bg-dark text-white">
                        {this.showfun()}
                    </tbody>
                </Table></Collapse>
            </div>
        )
    }
}
export default onep;
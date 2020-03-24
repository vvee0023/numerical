import React from "react"
import Table from 'react-bootstrap/Table'
import {compile} from 'mathjs'
import { Collapse } from "react-bootstrap"
var labelBic=[]

class graphic extends React.Component{
    constructor(props){
        super(props)
        this.state={
          SumX:"",
          start:"",
          finish:"",
          talang:false
        }
        this.setSumX=this.setSumX.bind(this);
        this.setStart=this.setStart.bind(this);
        this.setFinish=this.setFinish.bind(this);
    }
    setSumX(event){
        this.setState({SumX:event.target.value})
    }
    setStart(event){
        this.setState({start:event.target.value})
    }
    setFinish(event){
        this.setState({finish:event.target.value})
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
        var one = compile(this.state.SumX);
        var scope=""
        var sum=""
        var r=0
        let start=parseInt(this.state.start)
        let end=parseInt(this.state.finish)
        for(var i=start;i<=end;i++){
            r++
            scope = {x:parseInt(i)}
            sum=one.evaluate(scope);
            labelBic.push(<tr>
                <td>{r}</td>
                <td>{i}</td>
                <td>{sum}</td>
            </tr>)
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
            <div className="card  bg-dark text-dark">
                <label className="alert">
                    <br/><div className="alert alert-info ">Graphical Method</div>
                    <br/>
                    <div className="input-group" >
                        <div className="input-group-prepend"><span className="input-group-text">f(x)</span></div>
                            <input type="text" style={styles} value={this.state.SumX} onChange={this.setSumX}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">start</span></div>
                                <input type="number" style={styles2} value={this.state.start} onChange={this.setStart}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">finish</span></div>
                                <input type="number" style={styles2} value={this.state.finish} onChange={this.setFinish}/>
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
export default graphic;
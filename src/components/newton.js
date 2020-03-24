import React from "react"
import Table from 'react-bootstrap/Table'
import {compile,derivative} from 'mathjs'
import { Collapse } from "react-bootstrap"
var labelBic=[]

class newton extends React.Component{
    constructor(props){
        super(props)
        this.state={
          SumX:"",
          errorX:"",
          X:"",
          talang:false
        }
        this.setSumX=this.setSumX.bind(this);
        this.setX=this.setX.bind(this);
    }
    setSumX(event){
        this.setState({SumX:event.target.value})
    }
    setX(event){
        this.setState({X:event.target.value})
    }
    runfun(event){
        this.setState({talang:event})
        if(event){
            labelBic.length=0
           this.fun()
        }
        
    }
    showfun(){
        return labelBic
    }
    fun(){
        var x=this.state.X,sum=this.state.SumX,fun="",diff="",xold=parseFloat(x),scope="",ffun="",fdif="",xnew="",error="",i=0
        while(true){   
            fun=compile(sum)
            diff=derivative(sum,"x")
            scope={x:parseFloat(xold)}
            ffun=fun.evaluate(scope)
            fdif=diff.evaluate(scope)
            xnew=xold-(ffun/fdif)
            error=((xnew-xold)/xnew)*100
            xold=xnew
            labelBic.push(<tr>
                <td>{i}</td>
                <td>{xold}</td>
                <td>{error}</td>
            </tr>)
            i++
            if(error<0.000001||i>100){
                break
            }
        }
        
    }
    render(){
        const styles={
			width: "250px"
        }
        return(
            <div className="card   bg-dark text-dark">
                <label className="alert">
                    <br/><div className="alert alert-info ">Newton Raphson</div>
                    <br/>
                    <div className="input-group" >
                        <div className="input-group-prepend"><span className="input-group-text">f(x)</span></div>
                            <input type="text" style={styles} value={this.state.SumX} onChange={this.setSumX}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">X</span></div>
                                <input type="number" style={styles} value={this.state.X} onChange={this.setX}/>
                        </div><br/>
                        <button onClick={()=>this.runfun(true)} className="btn btn-info ">sum</ button>
                </label>
                <Collapse in={this.state.talang}><Table>
                    <thead class= " bg-dark text-white">
                        <tr>
                        <th>Iteration</th>
                        <th>X</th>
                        <th>ERROR</th>
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
export default newton;
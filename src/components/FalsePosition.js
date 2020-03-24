import React from "react"
import Table from 'react-bootstrap/Table'
import {compile} from 'mathjs'
import { Collapse } from "react-bootstrap"
var labelBic=[]
const  dataBic=[]

class FalsePosition extends React.Component{
    constructor(props){
        super(props)
        this.state={
          SumX:"",
          errorX:"",
          Xl:"",
          Xr:"",
          Xm:"",
          Iteration:"",
          talang:false
        }
        this.setSumX=this.setSumX.bind(this);
        this.setXl=this.setXl.bind(this);
        this.setXr=this.setXr.bind(this);
        this.setIteration=this.setIteration.bind(this);
    }
    setSumX(event){
        this.setState({SumX:event.target.value})
    }
    setXl(event){
        this.setState({Xl:event.target.value})
    }
    setXr(event){
        this.setState({Xr:event.target.value})
    }
    setIteration(event){
        this.setState({Iteration:event.target.value})
    }
    runfun(event){
        this.setState({talang:event})
        if(event){
            labelBic.length=0
           this.fun(this.state.Iteration)
        }
        
    }
    showfun(){
        return labelBic
    }
    fun(event){
        var one =compile(this.state.SumX)
        let xl=parseFloat(this.state.Xl)
        let xr=parseFloat(this.state.Xr)
        let iteration=event
        let xmnew=""
        let errorxm=""
        var scopeXl ={x:parseFloat(this.state.Xl)}
        var scopeXr ={x:parseFloat(this.state.Xr)}
        var sumxr =one.evaluate(scopeXr)
        var sumxl =one.evaluate(scopeXl)
        let xmold=(xr-((sumxr*(xl-xr))/(sumxl-sumxr)))
        var scopeXm ={x:parseFloat(xmold)}
        var sumxm =one.evaluate(scopeXm)
        var sumvalue=parseFloat(sumxm)*parseFloat(sumxr)
        if(sumvalue<0){
          xl=xmold
        }
        else{
          xr=xmold
        }
        labelBic.push(<tr>
                        <td>0</td>
                        <td>{xl}</td>
                        <td>{xr}</td>
                        <td>{xmold}</td>
                        <td>null</td>
                    </tr>)
        dataBic.push({
            Interation:0,
            xm:xmold
        })
        for(var i=1;i-1<iteration;i++){
          scopeXl ={x:parseFloat(xl)}
          scopeXr ={x:parseFloat(xr)}
          sumxr =one.evaluate(scopeXr)
          sumxl =one.evaluate(scopeXl)
          xmnew=(xr-((sumxr*(xl-xr))/(sumxl-sumxr)))
          scopeXm ={x:parseFloat(xmnew)}
          sumxm =one.evaluate(scopeXm)
          sumvalue=parseFloat(sumxm)*parseFloat(sumxr)
          if(sumvalue<0){
            xl=xmnew
          }
          else{
            xr=xmnew
          }
          errorxm=(xmnew-xmold)/xmnew
          labelBic.push(<tr>
                <td>{i}</td>
                <td>{xl}</td>
                <td>{xr}</td>
                <td>{xmnew}</td>
                <td>{errorxm}</td>
            </tr>)
            dataBic.push({
                Interation:{i},
                xm:xmnew
            })
          xmold=xmnew
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
            
            <div className="card bg-dark text-dark">
                <label className="alert">
                    <br/><div className="alert alert-info ">False-Position Method</div>
                    <br/>
                    <div className="input-group" >
                        <div className="input-group-prepend"><span className="input-group-text">f(x)</span></div>
                            <input type="text" style={styles} value={this.state.SumX} onChange={this.setSumX}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">XL</span></div>
                                <input type="number" style={styles} value={this.state.Xl} onChange={this.setXl}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">XR</span></div>
                                <input type="number" style={styles} value={this.state.Xr} onChange={this.setXr}/>
                        </div><br/>
                        <div className="input-group" >
                            <div className="input-group-prepend"><span className="input-group-text">Iteration</span></div>
                                <input type="number" style={styles2} value={this.state.Iteration} onChange={this.setIteration}/>
                        </div><br/>
                        <button onClick={()=>this.runfun(true)} className="btn btn-info ">sum</ button>
                </label>
                <Collapse in={this.state.talang}><Table>
                    <thead class= " bg-dark text-white">
                        <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>XR</th>
                        <th>XM</th>
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
export default FalsePosition;
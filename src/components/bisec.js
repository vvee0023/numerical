import React from "react"
import Table from 'react-bootstrap/Table'
import {compile} from 'mathjs'
import { Collapse } from "react-bootstrap"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
var labelBic=[]
const  dataBic=[]

class bisec extends React.Component {
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
    zero = () =>{
        console.log("sads")
        this.setzero()
    }
    setzero(){
        document.getElementById('InputBic').value = ''
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
        let xmold=(xl+xr)/2
        let xmnew=""
        let errorxm=""
        var scopeXr ={x:parseFloat(this.state.Xr)}
        var scopeXm ={x:parseFloat(xmold)}
        var sumxr =one.evaluate(scopeXr)
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
          xmnew=(xl+xr)/2
          scopeXm ={x:parseFloat(xmnew)}
          sumxr =one.evaluate(scopeXr)
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
                Iteration:{i},
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
            <div className="card   bg-dark text-dark">
                <label className="alert"><br/>
                    <div  className="alert alert-info ">Bisection Method</div>
                    <br/>
                    <div className="input-group" >
                        <div className="input-group-prepend"><span className="input-group-text">f(x)</span></div>
                            <input type="text" style={styles} value={this.state.SumX} onChange={this.setSumX} id="InputBic"/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">Xl</span></div>
                                <input type="number" style={styles} value={this.state.Xl} onChange={this.setXl}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">Xr</span></div>
                                <input type="number" style={styles} value={this.state.Xr} onChange={this.setXr}/>
                        </div><br/>
                        <div className="input-group" >
                            <div className="input-group-prepend"><span className="input-group-text">Iteration</span></div>
                                <input type="number" style={styles2} value={this.state.Iteration} onChange={this.setIteration}/>
                        </div><br/>
                        <button onClick={()=>this.runfun(true)} className="btn btn-info ">sum</ button>
                </label>
                <Collapse in={this.state.talang}>
                <LineChart width={600} height={300} data={dataBic} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="xm" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="Interation" />
                        <YAxis />
                </LineChart>
                </Collapse>
                <Collapse in={this.state.talang}><Table>
                    <thead class= " bg-dark text-white">
                        <tr>
                        <th>Iteration</th>
                        <th>Xl</th>
                        <th>Xr</th>
                        <th>Xm</th>
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
export default bisec;

/*import React from 'react'
import ReactDOM from 'react-dom';
import { compile } from 'mathjs';
import { Table } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';


const columns = [
    {
      title: 'Iteration',
      dataIndex: 'iteration',
      width: 100,
    },
    {
      title: 'XL',
      dataIndex: 'xl',
      width: 180,
    },
    {
      title: 'XR',
      dataIndex: 'xr',
      width: 180,
    },
    {
      title: 'Error',
      dataIndex: 'error',
    },
  ];
  
  var data = [];
  
  let ii = 1;
  class bisec extends React.Component
  {
     constructor()
     {
       super();
       this.state = {
          XL:0,
          XR:0,
          fx:"x^4-13",
          er: 0.000001
       }
        this.handleChage = this.handleChage.bind(this);
        // this.fxbisection = this.fxbisection.bind(this);
     }
      handleChage(event){
      this.setState({
        [event.target.name]: event.target.value
      });
     }
     
    
     fxbisection(xl,xr)
     {
  
      var sum = parseFloat(0.000000);
      var xm = 0;
      var Xl =[];
      var Xr =[];
      var Er =[];
      var xmn = 0;
      var ii = 0;
      do{
        Xl[ii] = xl;
        Xr[ii] = xr;
        xm = (xl+xr)/2;
        var fxm = this.fun(xm);
        var xm1 = fxm*this.fun(xr);
        if(xm1 > 0)
        {
          xr = xm;
        }
        else{
          xl = xm;
        }
        xmn = ((xl+xr)/2);
        sum = this.Err(xmn,xm);
        sum = Math.abs(sum).toFixed(8);
        Er[ii] = sum;
        ii++;
      }while(sum > 0.000001);
      this.setdata(Xl,Xr,Er);
      // return sum;
  
     }
     
     fun(X){
      var expr = compile(this.state.fx);
      let scope = { x: parseFloat(X) };
      return expr.eval(scope);
     }
     Err(n,m)
     {
       return (n-m)/n;
     }
     setdata(Xl,Xr,Er)
     {
      data = []
      for (let i = 0; i < Xl.length; i++) {
        data.push({
  
          iteration:i +1,
          xl: Xl[i],
          xr: Xr[i],
          error: Er[i],
        });
      }
     }
     render(){
       return(
         <div> 
          {/* <label>
            Input XL:
            <input name="XL" value={this.state.value} onChange= {this.handleChage}/>
          </label> *///}
          //{/* <label>
          /*  Input XR:
            <input name="XR" value={this.state.value} onChange= {this.handleChage}/>
          </label> *//*}
           <h4>Bisection Method </h4><br></br>
          <h4>F(x) = x^4-13 </h4><br></br>
          {/* <Input placeholder="F(x) = x^4-13" name="fx" value={this.state.value} onChange= {this.handleChage}/> *//*}
          <Input placeholder="Input XL:" name="XL" value={this.state.value} onChange= {this.handleChage}/>
          <Input placeholder="Input XR:" name="XR" value={this.state.value} onChange= {this.handleChage}/>
          {/* <Button type="primary" 
            onClick={() => this.fxbisection(parseFloat(this.state.XL),parseFloat(this.state.XR))}
          >Start!</Button>
           *//*}
          
          {this.fxbisection(parseFloat(this.state.XL),parseFloat(this.state.XR))}<br></br>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 0 }} scroll={{ y: 240 }} />  
  
         </div>
          
       );
     }
  }
  export default bisec;*/


import React from "react"
import Table from 'react-bootstrap/Table'
import {compile} from 'mathjs'
import { Collapse } from "react-bootstrap"


function cs(){
    const styles={
        width: "250px"
    }
    const styles2={
            width: "200px"
    }
    return(
        <body class="bg-dark text-white">
             <label className="alert">
                    <br/><div className="alert alert-info "> Composite Simpson’s Rule</div>
                    <br/>
                    <div className="input-group" >
                        <div className="input-group-prepend"><span className="input-group-text">f(x)</span></div>
                            <input type="text" style={styles}/>
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">XL</span></div>
                                <input type="number" style={styles} />
                        </div><br/>
                        <div className="input-group">
                            <div className="input-group-prepend"><span className="input-group-text">XR</span></div>
                                <input type="number" style={styles} />
                        </div><br/>
                        <div className="input-group" >
                            <div className="input-group-prepend"><span className="input-group-text">Iteration</span></div>
                                <input type="number" style={styles2} />
                        </div><br/>
                        <button onClick={()=>this.runfun(true)} className="btn btn-info ">sum</ button>
                </label>

        </body>
        

     
    )
}
export default cs;



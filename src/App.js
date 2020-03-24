import React from 'react';
import{BrowserRouter , Router, Switch,Link, Route} from 'react-router-dom';
import bisec from './components/bisec';
import home from './components/home';
import graphic from './components/graphic';
import secant from './components/secant';
import FalsePosition from './components/FalsePosition';
import onep from './components/onep';
import newton from './components/newton';
import newton2 from './components/newton2';
import lag from './components/lag';
import spline from './components/spline';
import cs from './components/cs';
import ct from './components/ct';
import null2 from './components/null2';
import './App.css';
import './nav.css';

function App() {
    return(
      <BrowserRouter> 
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link class="navbar-brand" to="/">Jira.Vee</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Root Of Equations
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to ="/graphic">Graphical Method</Link>
          <Link class="dropdown-item" to ="/bisec">Bisection Method</Link>
          <Link class="dropdown-item" to ="/FalsePosition">False-Position Method</Link>
          <Link class="dropdown-item" to ="/onep">One-Point Iteration Method</Link>
          <Link class="dropdown-item" to ="/secant">Secant Method</Link>
          <Link class="dropdown-item" to ="/newton">Newton Raphson</Link>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Interpolation Technique
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to="/newton2">Newton's Divided-Differences</Link>
          <Link class="dropdown-item" to="/lag">Lagrange Polynomials</Link>
          <Link class="dropdown-item" to="/spline"> Spline Interpolation</Link>
         
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Numerical Integration Technique
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to="#">Trapezoidal Rule </Link>
          <Link class="dropdown-item" to="ct">Composite Trapezodial Rule</Link>
          <Link class="dropdown-item" to="null2">Simpson’s Rule</Link>
          <Link class="dropdown-item" to="cs">Composite Simpson’s Rule</Link>
          <Link class="dropdown-item" to="null2">Newton-Cotes Integration Formulas</Link>
          <Link class="dropdown-item" to="null2">Romberg Integration</Link>
          <Link class="dropdown-item" to="null2">Gauss Quadrature</Link>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Solution Technique
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to="null2">Cramer’s Rule</Link>
          <Link class="dropdown-item" to="null2">Gauss Elimination Method</Link>
          <Link class="dropdown-item" to="null2">Gauss-Jordan Method</Link>
          <Link class="dropdown-item" to="null2">Matrix Inversion Method</Link>
          <Link class="dropdown-item" to="null2">LU Décomposition Method</Link>
          <Link class="dropdown-item" to="null2">Cholesky Décomposition Method</Link>
          <Link class="dropdown-item" to="null2">Jacobi Iteration Method</Link>
          <Link class="dropdown-item" to="null2">Gauss-Seidel Iteration Method</Link>
          <Link class="dropdown-item" to="null2">Conjugate Gradient Method</Link>
        </div>
      </li>
     
    </ul>
  </div>
  </nav>
  <div>
    <Switch>
    <Route exact path = "/" component= {home}/>
    <Route exact path = "/graphic" component= {graphic}/>
      <Route exact path = "/bisec" component= {bisec}/>
      <Route exact path = "/FalsePosition" component= {FalsePosition}/>
      <Route exact path = "/onep" component= {onep}/>
      <Route exact path = "/secant" component= {secant}/>
      <Route exact path = "/newton" component= {newton}/>
      <Route exact path = "/newton2" component= {newton2}/>
      <Route exact path = "/lag" component= {lag}/>
      <Route exact path = "/spline" component= {spline}/>
      <Route exact path = "/ct" component= {ct}/>
      <Route exact path = "/cs" component= {cs}/>
      <Route exact path = "/null2" component= {null2}/>
      <Route exact path = "/null2" component= {null2}/>
    </Switch>
    </div>
    <footer class="page-footer font-small blue">

<div class="footer-copyright text-center py-5 text-info bg-dark "><h5 class = "text-white">© 2020 Made By :</h5>
<a href="https://www.facebook.com/vvee.jirarat"> <h5 class = "text-white">Jira.Vee</h5> </a>
  <p>
  <h3 class = "text-white"><strong>Numerical Method</strong></h3>
  </p>

</div>


</footer>
  </BrowserRouter>
  
  );
}
export default App;



import React from 'react';
import './App.css';
import Button from "./Components/Button";
import Display from "./Components/Display";


const isOperator = /[*/+-]/,
  endsWithOperator = /[*/+-]$/,
  endsWithNumbers = /[0-9]$/,
  endsWithDecimal = /[.]$/,
  endsWithSubtract = /[-]$/;

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      evaluated: '',
      lastClicked: ''
    };
    this.initialize = this.initialize.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNegation = this.handleNegation.bind(this);
  }

  initialize () {
    this.setState({
      currentVal: '0',
      evaluated: '',
      lastClicked: ''
    });
  };

  handleNumbers (e) {
    if (this.state.currentVal == '0' || this.state.evaluated === true) {
      this.setState({ currentVal: e.target.value, evaluated: false
      });
    }
    else if (this.state.currentVal.length < 12 && this.state.currentVal !== '0') {
      this.setState({currentVal: this.state.currentVal + e.target.value, evaluated: false 
      });
    }
  };

  handleOperators (e) {
     if (endsWithOperator.test(this.state.currentVal)) {
      this.setState({ currentVal: this.state.currentVal.slice(0, -1) + e.target.value});
    }
   
    else {
      this.setState({
        currentVal: this.state.currentVal + e.target.value, evaluated: false
      });
    }
  };

  handleEvaluate () {
    let formula = this.state.currentVal;
    if (endsWithOperator.test(this.state.currentVal)) {
      formula = formula.slice(0, -1);
    let answer = Math.round(1000000000000 * eval(formula)) / 1000000000000;
    this.setState({ currentVal: answer, evaluated: true });
  }
  else {
    let answer = Math.round(1000000000000 * eval(formula)) / 1000000000000;
    this.setState({ currentVal: answer, evaluated: true });
  }
    };
  
  handleDecimal () {
    if (this.state.evaluated === true || this.state.currentVal == '0') {
      this.setState({ currentVal: '0.', evaluated: false });
    }
    else if (endsWithNumbers.test(this.state.currentVal) && !this.state.currentVal.includes('.') && !endsWithDecimal.test(this.state.currentVal)) {
      this.setState({ currentVal: this.state.currentVal + '.' });
    }
    else if (endsWithOperator.test(this.state.currentVal) && this.state.currentVal.includes('.') && !endsWithDecimal.test(this.state.currentVal)) {
      this.setState({ currentVal: this.state.currentVal + '0.', evaluated: false });
    }
    else if (isOperator.test(this.state.currentVal) && this.state.currentVal.includes('.') && endsWithNumbers.test(this.state.currentVal)) {
      this.setState({ currentVal: this.state.currentVal + '.', evaluated: false });
    }
  };

  handleNegation (e) {
    if (endsWithOperator.test(this.state.currentVal) && !endsWithSubtract.test(this.state.currentVal)) {
      this.setState({ currentVal: this.state.currentVal + e.target.value
      });
    }
    else if (endsWithDecimal.test(this.state.currentVal) || endsWithNumbers.test(this.state.currentVal)) {
      this.setState({ currentVal: this.state.currentVal * -1 });
    }
    else if (endsWithSubtract.test(this.state.currentVal)) {
      this.setState({ currentVal: this.state.currentVal.slice(0, -1) + '+' });
    }
  };

render() {
  return (
    <div id = "wrapper">
      <div className = "container">
      <Display currentValue={this.state.currentVal}/>
      <Button 
      numbers = {this.handleNumbers}
      operators = {this.handleOperators}
      decimal = {this.handleDecimal}
      evaluate = {this.handleEvaluate}
      initialize = {this.initialize}
      negation = {this.handleNegation}
      />
      </div>
    </div>
    );
  }
};

export default Calculator;

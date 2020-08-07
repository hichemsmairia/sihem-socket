import React, { Component } from "react";
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';


class PaymentForm extends Component { 
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
      };
     
      handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
      }
      
      handleInputChange = (e) => {
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
      }
    render() {
        return (
                <div>
                    
                      
                        <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form style={{"margin": "16px 505px"}}>
        <br>
          </br>
        	<input
            type="number"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
           <br>
          </br>
          <input
            type="month"
            name="expiry"
            placeholder="Date d'expirtation"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
           <br>
          </br>
          <input
            type="text"
            name="name"
            placeholder="votre nom"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <br>
          </br>
          <input
            type="number"
            name="cvc"
            placeholder="cvc code"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
        </form>
      </div> 

                </div>

        )
    }
}

export default PaymentForm ; 
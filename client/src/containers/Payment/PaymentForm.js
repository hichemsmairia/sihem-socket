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
                    <h1>Historique de paiement</h1>
                        <table>
                            <tr>
                                <td>colone 1</td>
                                <td>colone 2 </td>
                            </tr>
                        </table>
                        <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form>
        	<input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          ...
        </form>
      </div> 

                </div>

        )
    }
}

export default PaymentForm ; 
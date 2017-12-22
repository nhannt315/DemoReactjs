import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional component,doesn't have to be class component
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        )
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)} $</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

// const orderSummary = (props) => {
//   const ingredientsSummary = Object.keys(props.ingredients)
//     .map(igKey => {
//       return (
//         <li key={igKey}>
//           <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
//         </li>
//       )
//     });
//   return (
//     <Aux>
//       <h3>Your Order</h3>
//       <p>A delicious burger with the following ingredients:</p>
//       <ul>
//         {ingredientsSummary}
//       </ul>
//       <p><strong>Total Price: {props.price.toFixed(2)} $</strong></p>
//       <p>Continue to checkout?</p>
//       <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
//       <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
//     </Aux>
//   );
// };

export default OrderSummary;
import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nguyen Nhan',
                address: {
                    street: 'Mai Dich',
                    zipCode: '4132',
                    country: 'Vietnam'
                },
                email: 'nhannt.bk@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        this.setState({loading: true});
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    };


    render() {
        let form;
        if (this.state.loading) {
            form = <Spinner/>;
        } else {
            form = (
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your name'/>
                    <input className={classes.Input} type='email' name='email' placeholder='Your email'/>
                    <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                    <input className={classes.Input} type='text' name='postal' placeholder='Postal Code'/>
                    <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
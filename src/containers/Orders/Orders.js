import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let order = <Spinner/>;
        if (!this.props.loading) {
            order = (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id} ingredients={order.ingredients} price={order.price.toFixed(2)}/>
                    ))}
                </div>
            );
        }
        return order;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
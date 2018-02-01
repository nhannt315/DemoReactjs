import React from 'react';
import classes from './BuildControl.css';
import { Button } from 'react-bootstrap';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <Button bsStyle='warning' onClick={props.removed} disabled={props.disabled}>Less</Button>
        <Button bsStyle='info' onClick={props.added}>More</Button>
    </div>
);

export default buildControl;
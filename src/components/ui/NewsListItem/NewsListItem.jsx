import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import './NewsListItem.css'

export class NewsListItem extends Component {
    nullOnClick = () => null
    render() {
        let classes = `${this.props.className}`
        return (
            <ListItem button className={classes}
            onClick={(e) => { this.props.handleOnClick ? this.props.handleOnClick() : this.nullOnClick()} }>
                {this.props.children}
            </ListItem>
        );
    }
}

export default NewsListItem;

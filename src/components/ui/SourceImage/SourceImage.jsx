import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import './SourceImage.css'

export class SourceImage extends Component {
    render() {
        return (
            <CardMedia
            className="card-media"
            image={this.props.image}
            />
        );
    }
}

export default SourceImage;

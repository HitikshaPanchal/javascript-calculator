import React from 'react';

class Display extends React.Component {
    render() {
        return (
            <div id = "display" className = "screen">
                {this.props.currentValue}
            </div>
        );
    }
};

export default Display;
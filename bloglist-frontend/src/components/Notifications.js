import React from 'react';

const Notifications = ({ successMessage, errorMessage }) => {

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        padding: '10px',
        marginBottom: '10px'
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        padding: '10px',
        marginBottom: '10px'
    }

    if (errorMessage) {
        return (
            <div style={errorStyle}>
                {errorMessage}
            </div>
        )
    }
    if (successMessage) {
        return (
            <div style={successStyle}>
                {successMessage}
            </div>
        );
    }
    return null

};

export default Notifications;
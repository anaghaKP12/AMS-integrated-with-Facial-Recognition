import React from 'react';
const HeaderComponent = ({ title }) => {
    return (
        <div className="header">
            <h1 className="header-title">{title}</h1>
        </div>
    );
};

export default HeaderComponent;

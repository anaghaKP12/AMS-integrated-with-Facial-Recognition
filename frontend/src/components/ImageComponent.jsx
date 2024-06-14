import React from 'react';

const ImageComponent = ({ src, width, height }) => {
    return <img src={src} style={{ width, height }} alt="component" />;
};

export default ImageComponent;

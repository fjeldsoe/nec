import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default props => {
    const { image } = props;

    const srcsetStrings = image =>
        image.downloadUrls.map(obj => {
            const [key, url] = Object.entries(obj)[0];
            const width = key.split('x')[0];
            return `${url} ${width}w`;
        });

    return (
        <Image
            key={image.id}
            srcSet={srcsetStrings(image).join(', ')}
            src={Object.values(image.downloadUrls[0])[0]}
            alt={image.metadata.name}
            loading="lazy"
        />
    );
};

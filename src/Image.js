import React from 'react';
import styled from 'styled-components/macro';

const Image = styled.img`
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
`;

export default (props) => {
    const { image, className, sizes } = props;

    const srcsetStrings = (image) =>
        image.downloadUrls.map((obj) => {
            const [key, url] = Object.entries(obj)[0];
            const width = key.split('x')[0];
            return `${url} ${width}w`;
        });

    return (
        <Image
            className={className}
            key={image.id}
            srcSet={srcsetStrings(image).join(', ')}
            src={Object.values(image.downloadUrls[0])[0]}
            sizes={sizes}
            alt={image.metadata.name}
            loading="lazy"
        />
    );
};

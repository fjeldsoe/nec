import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Images = styled.div`
    flex: 1 1 auto;
    width: 25%;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function App(props) {
    const { images } = props;
    return (
        <Wrapper>
            {images.length ? (
                images.map(image => (
                    <Images>
                        <Image key={image.id} src={image.downloadUrl} alt={image.metadata.name} />
                    </Images>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </Wrapper>
    );
}

export default App;

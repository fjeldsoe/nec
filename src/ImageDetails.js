import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    flex: 0 1 auto;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
`;

export default props => {
    const {
        image,
        image: { downloadUrl },
        removeImage
    } = props;

    return (
        <Wrapper>
            <div>
                <Link to="/">Tilbage</Link>
                <button onClick={() => removeImage(image)}>Slet billede</button>
            </div>
            <ImageWrapper>
                <Image src={downloadUrl} alt="" />
            </ImageWrapper>
        </Wrapper>
    );
};

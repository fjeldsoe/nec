import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from './Image';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
`;

const ImageLink = styled(Link)`
    flex: 0 0 auto;
    width: 100%;
    margin: 5px;
`;

const UploadIndicator = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    opacity: ${props => (props.uploadProgress === 0 || props.uploadProgress === 100 ? 0 : 1)};
    transition: opacity 300ms;
    pointer-events: none;

    &:after {
        content: '';
        display: block;
        height: inherit;
        width: ${props => props.uploadProgress || 0}%;
        background: #54a2e6;
    }
`;

function App(props) {
    const { images, uploadProgress } = props;

    return (
        <>
            <UploadIndicator uploadProgress={uploadProgress} />
            <Wrapper>
                {images.length
                    ? images.map(image => (
                          <ImageLink to={`/image/${image.id}`} key={image.id}>
                              <Image key={image.id} image={image} />
                          </ImageLink>
                      ))
                    : null}
            </Wrapper>
        </>
    );
}

export default App;

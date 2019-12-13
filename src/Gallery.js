import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from './Image';
import breakpoints, { breakpointUp } from './breakpoints';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
`;

const ImageLink = styled(Link)`
    flex: 0 0 auto;
    width: calc(50%);
    max-height: 300px;
    padding: 5px;
    overflow: hidden;

    ${breakpointUp('sm')} {
        width: calc(33.3%);
    }

    ${breakpointUp('md')} {
        width: calc(25%);
    }

    ${breakpointUp('lg')} {
        width: calc(20%);
    }
`;

const Thumb = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
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
                              <Thumb key={image.id} image={image} sizes={`50vw, (min-width: ${breakpoints.sm}px) 33.3vw, (min-width: ${breakpoints.md}px) 25vw, (min-width: ${breakpoints.lg}px) 20vw`} />
                          </ImageLink>
                      ))
                    : null}
            </Wrapper>
        </>
    );
}

export default App;

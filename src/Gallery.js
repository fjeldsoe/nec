import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
`;

const ImageLink = styled(Link)`
    flex: 1 1 auto;
    width: 25%;
    margin: 5px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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
                {images.length ? (
                    images.map(image => (
                        <ImageLink to={`/${image.id}`} key={image.id}>
                            <Image key={image.id} src={image.downloadUrl} alt={image.metadata.name} />
                        </ImageLink>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </Wrapper>
        </>
    );
}

export default App;
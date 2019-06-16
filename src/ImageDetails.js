import React from 'react';
import styled from 'styled-components';
import Image from './Image';

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

const ColorBlock = styled.span`
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: ${({ color }) => `rgb(${color.red},${color.green},${color.blue})`};
`;

export default props => {
    const { history, image, removeImage } = props;

    console.log(props);
    return (
        <>
            <Wrapper>
                <div>
                    <button onClick={() => history.push('/')}>Tilbage</button>
                    <button onClick={() => removeImage(image)}>Slet billede</button>
                </div>
                <ImageWrapper>
                    <Image image={image} />
                </ImageWrapper>
            </Wrapper>
            <div>
                {image.metadata.visionData.colors.map((data, index) => {
                    console.log(data.color);
                    return <ColorBlock key={index} color={data.color} />;
                })}
            </div>
            <ul>
                {image.metadata.visionData.labels.map((data, index) => {
                    console.log(data.color);
                    return <li>{data.description}</li>;
                })}
            </ul>
        </>
    );
};

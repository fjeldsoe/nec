import React, { useContext } from 'react';
import styled from 'styled-components';
import Image from './Image';
import { AppContext } from './App';
import { getLuminance, getContrast } from 'polished';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${(props) => props.gradient};
`;

const ImageWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const DetailedImage = styled(Image)`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.5));
`;

const ButtonBar = styled.div`
    display: flex;
    height: 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
    flex: 1 1 50%;
    font-weight: bold;
    border: 0;
`;

const BackButton = styled(Button)`
    background: ${({ backgroundColor }) => backgroundColor};
    color: ${({ fontColor }) => fontColor};
`;

const DeleteButton = styled(Button)`
    color: #fff;
    background: linear-gradient(0deg, rgba(162, 0, 0, 1) 0%, rgba(218, 0, 0, 1) 100%);
`;

// const ColorBlock = styled.span`
//     display: inline-block;
//     width: 30px;
//     height: 30px;
//     background-color: ${({ color }) => `rgb(${color.red},${color.green},${color.blue})`};
// `;

export default (props) => {
    const { history, image, removeImage } = props;
    const { colors } = image.metadata.visionData;
    const [primaryColor, secondaryColor] = colors
        .sort((a, b) => b.score - a.score)
        .reduce((acc, curr, index) => {
            const {
                color: { red, green, blue },
            } = curr;
            return index < 2 ? [...acc, `rgb(${red}, ${green}, ${blue})`] : acc;
        }, []);

    const [innerColor, outerColor] = [primaryColor, secondaryColor].sort((a, b) => getLuminance(b) - getLuminance(a));
    const { user } = useContext(AppContext);
    const gradient = `radial-gradient(circle, ${innerColor} 0%, ${outerColor} 100%)`;
    const [fontColor] = ['#000', '#FFF'].sort((a, b) => getContrast(outerColor, b) - getContrast(outerColor, a));

    return (
        <>
            <Wrapper gradient={gradient}>
                <ImageWrapper>
                    <DetailedImage image={{ ...image }} sizes="90vw" />
                </ImageWrapper>
                <ButtonBar>
                    <BackButton backgroundColor={outerColor} fontColor={fontColor} onClick={() => history.push('/')}>
                        Tilbage
                    </BackButton>
                    {user && <DeleteButton onClick={() => removeImage(image)}>Slet billede</DeleteButton>}
                </ButtonBar>
            </Wrapper>
            {/* <div>
                {colors &&
                    colors.map((data, index) => {
                        return <ColorBlock key={index} color={data.color} />;
                    })}
            </div>
            <ul>
                {labels &&
                    labels.map((data, index) => {
                        return <li key={index}>{data.description}</li>;
                    })}
            </ul>
            <ul>
                {text &&
                    text.map((data, index) => {
                        return <li key={index}>{data.description}</li>;
                    })}
            </ul> */}
        </>
    );
};

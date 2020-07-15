import React, { useContext } from 'react';
import styled from 'styled-components';
import Image from './Image';
import { AppContext } from './App';
import { getLuminance, getContrast } from 'polished';
import tinygradient from 'tinygradient';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    position: relative;
    flex: 1 0 auto;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 1px;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${(props) => props.gradient};
        filter: blur(100px);
    }
`;

const DetailedImage = styled(Image)`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.5));
`;

const ButtonBar = styled.div`
    flex: none;
    display: flex;
    width: 90%;
    max-width: 600px;
    height: 60px;
    margin: 20px auto;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
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

export default (props) => {
    const { history, image, removeImage } = props;
    const { colors } = image.metadata.visionData;
    console.log(colors);
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
    const gradient = tinygradient(colors.map(({ color: { red, green, blue } }) => `rgb(${red},${green},${blue})`));
    const [fontColor] = ['#000', '#FFF'].sort((a, b) => getContrast(outerColor, b) - getContrast(outerColor, a));

    return (
        <>
            <Wrapper>
                <ImageWrapper gradient={gradient.css('radial')}>
                    <DetailedImage image={{ ...image }} sizes="90vw" />
                </ImageWrapper>
                <div>lksjdf lksdjf ldskfj lsdkfj sldkfj sdlkf jslk fjl</div>
                <ButtonBar>
                    <BackButton backgroundColor={outerColor} fontColor={fontColor} onClick={() => history.push('/nec')}>
                        Tilbage
                    </BackButton>
                    {user && <DeleteButton onClick={() => removeImage(image)}>Slet billede</DeleteButton>}
                </ButtonBar>
            </Wrapper>
        </>
    );
};

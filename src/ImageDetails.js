import React, { useContext, useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import Image from './Image';
import { AppContext } from './App';
import { getLuminance, getContrast } from 'polished';
import tinygradient from 'tinygradient';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const GlobalStyles = createGlobalStyle`
    body {
        &:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-image: ${(props) => props.gradient};
            filter: blur(100px);
        }
    }

    .editorWrapper {
        color: black;
        margin-bottom: 5px;
    }

    .editorTextField {
        height: auto;
        padding: 10px;
        background: white;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
`;

const Overlay = styled.div`
    position: fixed;
    top: 10%;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 100%);
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.5);
    transform: translateY(${({ active }) => (active ? 0 : 'calc(100% - 60px)')});
    transition: transform 300ms ease;
`;

const OverlayNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
`;

const Back = styled.button`
    display: flex;
    align-items: center;
    height: inherit;
    background: none;
    border: 0;
    padding: 0 0 0 20px;
    color: inherit;
    font-size: inherit;
`;

const BackArrow = styled(ArrowBackIcon)`
    margin-right: 10px;
`;

const Toggle = styled.button`
    margin-right: 30px;
    background: none;
    border: 0;
    padding: 0;
    color: inherit;
    height: inherit;
    font-size: inherit;
`;

const ImageWrapper = styled.div`
    position: relative;
    flex: 1 0 auto;
    padding: 10px;
`;

const DetailedImage = styled(Image)`
    flex: none;
    display: block;
    margin: 0 auto;
    filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.5));
    opacity: ${({ fade }) => (fade ? 0.3 : 1)};
    position: absolute;
    width: calc(100% - 20px);
    height: calc(100% - 80px);
    object-fit: contain;
    transition: opacity 300ms ease;
`;

const Description = styled.div`
    flex: 1 1 auto;
    min-width: 1px;
    padding: 10px 20px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    @media (min-width: 375px) {
        padding: 10px 60px;
    }
`;

const ButtonBar = styled.div`
    position: relative;
    flex: none;
    display: flex;
    justify-content: center;
    height: 60px;
    margin: 20px 0;
`;

const Button = styled.button`
    flex: 1 1 50%;
    font-weight: bold;
    border: 0;
    max-width: 300px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const DeleteButton = styled(Button)`
    color: #fff;
    background: linear-gradient(0deg, rgba(162, 0, 0, 1) 0%, rgba(218, 0, 0, 1) 100%);
`;

const EditorWrappper = styled.div`
    margin: 0 auto;
`;

const SaveButton = styled.button`
    background: orange;
    border: none;
    width: 100%;
    height: 40px;
    font-weight: bold;
`;

export default (props) => {
    const { history, image, removeImage, updateDescription } = props;
    const { description } = image;
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
    const gradient = tinygradient(colors.map(({ color: { red, green, blue } }) => `rgb(${red},${green},${blue})`));
    const [fontColor] = ['#000', '#FFF'].sort((a, b) => getContrast(outerColor, b) - getContrast(outerColor, a));
    const [editorState, setEditorState] = useState(
        description ? EditorState.createWithContent(convertFromRaw(description)) : EditorState.createEmpty()
    );
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [isOverlayActive, setIsOverlayActive] = useState(false);

    function saveDescription() {
        const { id } = image;
        const description = convertToRaw(editorState.getCurrentContent());
        updateDescription({ id, description });
        setUnsavedChanges(false);
    }

    useEffect(() => {
        setUnsavedChanges(true);
    }, [editorState]);

    return (
        <>
            <GlobalStyles gradient={gradient.css('radial')} />
            <Wrapper>
                <ImageWrapper onClick={() => setIsOverlayActive(false)}>
                    <DetailedImage image={{ ...image }} fade={isOverlayActive} />
                </ImageWrapper>
                <Overlay active={isOverlayActive}>
                    <OverlayNav>
                        <Back onClick={() => window.history.back()}>
                            <BackArrow /> Tilbage
                        </Back>
                        <Toggle onClick={() => setIsOverlayActive(!isOverlayActive)}>
                            {isOverlayActive ? 'Skjul' : 'Vis'} beskrivelse
                        </Toggle>
                    </OverlayNav>
                    <Description>
                        {user && (
                            <EditorWrappper>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    toolbarClassName="editorToolbar"
                                    wrapperClassName="editorWrapper"
                                    editorClassName="editorTextField"
                                />
                                {unsavedChanges && <SaveButton onClick={saveDescription}>Gem beskrivelse</SaveButton>}
                            </EditorWrappper>
                        )}
                        {!user && description && (
                            <div dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(description)) }}></div>
                        )}
                        <ButtonBar>
                            {user && <DeleteButton onClick={() => removeImage(image)}>Slet billede</DeleteButton>}
                        </ButtonBar>
                    </Description>
                </Overlay>
            </Wrapper>
        </>
    );
};

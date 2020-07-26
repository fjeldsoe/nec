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
    flex-direction: column;
    margin: 0 auto;
    padding-bottom: 40px;
`;

const Background = styled.div`
    /* background-color: rgba(0, 0, 0, 0.2); */
    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.20211834733893552) 0%, rgba(0, 0, 0, 0) 100%);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
    position: relative;
    flex: 1 0 auto;
    padding: 10px;
`;

const DetailedImage = styled(Image)`
    flex: none;
    display: block;
    height: calc(100vh - 20px);
    margin: 0 auto;
    filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.5));
    object-fit: contain;
`;

const Description = styled.div`
    flex: 1 1 auto;
    min-width: 1px;
    padding: 10px 20px;
`;

const ButtonBar = styled.div`
    position: relative;
    flex: none;
    display: flex;
    height: 60px;
    margin: auto 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
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
                <Background>
                    <ImageWrapper>
                        <DetailedImage image={{ ...image }} />
                    </ImageWrapper>
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
                    </Description>
                </Background>
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

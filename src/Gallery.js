import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from './Image';
import breakpoints, { breakpointUp } from './breakpoints';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
`;

const SortableWrapper = SortableContainer((props) => <Wrapper {...props} />);

const Item = styled.div`
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

const SortableItem = SortableElement((props) => <Item {...props} />);

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
    opacity: ${(props) => (props.uploadProgress === 0 || props.uploadProgress === 100 ? 0 : 1)};
    transition: opacity 300ms;
    pointer-events: none;

    &:after {
        content: '';
        display: block;
        height: inherit;
        width: ${(props) => props.uploadProgress || 0}%;
        background: #54a2e6;
    }
`;

function Gallery(props) {
    const { images, uploadProgress, handleSortEnd, shouldCancelStart } = props;

    return (
        <>
            <UploadIndicator uploadProgress={uploadProgress} />
            <SortableWrapper axis="xy" pressDelay={500} onSortEnd={handleSortEnd} shouldCancelStart={shouldCancelStart}>
                {images.length
                    ? images.map((image, index) => (
                          <SortableItem index={index} key={image.id} data-order={image.order}>
                              <Link to={`/nec/image/${image.id}`}>
                                  <Thumb
                                      image={image}
                                      sizes={`50vw, (min-width: ${breakpoints.sm}px) 33.3vw, (min-width: ${breakpoints.md}px) 25vw, (min-width: ${breakpoints.lg}px) 20vw`}
                                  />
                              </Link>
                          </SortableItem>
                      ))
                    : null}
            </SortableWrapper>
        </>
    );
}

export default Gallery;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Image from './Image';
import breakpoints, { breakpointUp } from './breakpoints';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    margin-bottom: 50px;
`;

const SortableWrapper = SortableContainer((props) => <Wrapper {...props} />);

const Item = styled.div`
    flex: 0 0 auto;
    width: calc(50%);
    padding: 5px;
    overflow: hidden;
    height: 250px;

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
    content-visibility: auto;
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

const FooterBar = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 10px;
    font-size: 12px;
    background: #333;
    color: #999;

    transform: translateY(${({ hideFooter }) => (hideFooter ? 100 : 0)}%);
    transition: transform 300ms ease;
`;

const EmailButton = styled.button`
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    color: #999;
    cursor: pointer;
`;

const LoginButton = styled.button`
    padding: 0;
    margin: 0;
    background: none;
    border: 0;
    color: #999;
    cursor: pointer;
`;

function Gallery(props) {
    const { images, uploadProgress, handleSortEnd, shouldCancelStart, user, signOut } = props;
    const history = useHistory();
    const [hideFooter, setHideFooter] = useState(false);

    function handleEmailClick() {
        const a = 'nechristiansen';
        const b = 'gmail.com';
        window.open(`mailto:${a}@${b}`, '_blank');
    }

    function signIn() {
        history.push('/login');
    }

    useEffect(() => {
        let prevScrollY;

        function scrollHandler(event) {
            const currentScrollY = window.scrollY;

            if (
                currentScrollY < 50 ||
                currentScrollY >= document.documentElement.scrollHeight - window.innerHeight - 50
            ) {
                setHideFooter(false);
                return;
            }

            setHideFooter(currentScrollY > prevScrollY);

            prevScrollY = window.scrollY;
        }

        window.addEventListener('scroll', scrollHandler, { passive: true });

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <>
            <UploadIndicator uploadProgress={uploadProgress} />
            <SortableWrapper axis="xy" pressDelay={100} onSortEnd={handleSortEnd} shouldCancelStart={shouldCancelStart}>
                {images.length
                    ? images.map((image, index) => (
                          <SortableItem index={index} key={image.id}>
                              <Link to={`/image/${image.id}`}>
                                  <Thumb
                                      image={image}
                                      sizes={`50vw, (min-width: ${breakpoints.sm}px) 33.3vw, (min-width: ${breakpoints.md}px) 25vw, (min-width: ${breakpoints.lg}px) 20vw`}
                                  />
                              </Link>
                          </SortableItem>
                      ))
                    : null}
            </SortableWrapper>
            <FooterBar hideFooter={hideFooter}>
                <span>
                    <span>&copy; Niels Erik Christiansen</span>
                    <span> | </span>
                    <EmailButton onClick={handleEmailClick}>@ Email</EmailButton>
                    <span> | </span>
                    <LoginButton onClick={user ? signOut : signIn}>{user ? 'Log ud' : 'Log ind'}</LoginButton>
                </span>
            </FooterBar>
        </>
    );
}

export default Gallery;

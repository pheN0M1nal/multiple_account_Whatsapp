import styled from "styled-components";
import { ProfilePictureBoard } from "./ProfilePictureBoard";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { NavigationContext } from "./MainWrapper";
import logout from "../../assets/images/logout.png";
import profilePicture from "../../assets/images/noPic.png";
import down from "../../assets/images/211645_down_chevron_icon.svg";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.4rem 0 0.4rem 0.4rem;
    &:hover,
    &:active {
        border-radius: 5px;
    }
    .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: contain;
    }
    .name {
        margin-left: 10px;
        font-size: 0.8rem;
        font-size: var(--font-14);
        color: var(--custom-txt-color);
        font-family: var(--font-1);
        cursor: pointer;
        .first {
            color: var(--custom-txt-color);
        }
        .last {
            color: var(--custom-txt-color);
        }
        .downChevron {
            filter: invert(1);
            border-radius: 50%;
            width: 1rem;
            height: 1rem;
            padding: 2px;
            margin-right: 0.5rem;
            background-color: #aab8b6;
            margin-left: 0.5rem;
        }
    }

    .icon {
        color: var(--custom-orange);
        font-size: 1.3rem;
        margin-left: 1.5rem;
    }

    #pop-nav {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0px;
        right: 0;
        top: 56px;
        z-index: 1;
        background: var(--custom-secondry-bg);
        border-radius: 5px;
        border: 1px solid #c0dfd9;
        min-width: 11.1rem;
        width: 10rem;
        animation-duration: 200ms;
        animation-name: showPopNav;
        animation-timing-function: ease-in;

        @keyframes showPopNav {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        .logout-button {
            color: initial;
            text-decoration: none;
            font-size: var(--font-14);
            font-family: var(--font-1);
            transition: 0.25s all ease-out;
            font-weight: 500;
            display: flex;
            align-items: center;
            padding: 0.8rem 1.5rem;
            img {
                width: 30px;
                height: 30px;
                object-fit: cover;
                padding: 0.3rem;
            }
            :hover {
                color: var(--custom-orange);
            }
        }
    }
    #pop-nav.active {
        display: initial;
    }
    .AuthBtn {
        display: flex;
        gap: 1rem;
    }
`;

export const AccountBoard = () => {
    const [subNavToggle, setSubNavToggle] = useState(false);
    const { setCurrentSubNavKey } = useContext(NavigationContext);
    const handleOnClickProfileBoard = (e) => {
        e.preventDefault();
        setSubNavToggle(!subNavToggle);
        setCurrentSubNavKey((prev) => (prev === "auth" ? null : "auth"));
    };

    return (
        <Wrapper>
            <ProfilePictureBoard size={2.5}>
                <img
                    className="img"
                    src={profilePicture || "noPicture"}
                    alt=""
                    onClick={handleOnClickProfileBoard}
                />
            </ProfilePictureBoard>
            <div className="name" onClick={handleOnClickProfileBoard}>
                <span className="first">{"umar"}</span>
                <img className="downChevron" src={down} alt="down" />
            </div>
            {subNavToggle ? (
                <div id="pop-nav">
                    <Link to={`/logout`} className="logout-button">
                        <img src={logout} alt="logout" />
                        &nbsp; Log Out
                    </Link>
                </div>
            ) : null}
        </Wrapper>
    );
};

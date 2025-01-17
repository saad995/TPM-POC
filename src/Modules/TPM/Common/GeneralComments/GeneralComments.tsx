import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import styles from "./GeneralComments.module.scss";
import { GeneralComment, IGeneralCommentsByGroupCodeRequest, IProps } from "./GeneralCommentsInterfaces";
import { Chip } from "@progress/kendo-react-buttons";
import { clearState, getGeneralCommentsByGroupCodeAction } from "./GeneralCommentsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import MultiCarousel from "Elements/Basic/Carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const GeneralComments = (props: IProps) => {
    const dispatch = useDispatch();

    const [generalComments, setGeneralComments] = React.useState([] as GeneralComment[]);
    const generalCommentsStore: GeneralComment[] = useSelector((state: RootStore) => state.generalCommentsReducer.generalComments);

    const [currentComment, setCurrentComment] = React.useState("");

    if (props.currentComment) {
        generalComments.map((item: GeneralComment) => {
            item.isSelected = item.comment.toLowerCase() === props.currentComment?.toLowerCase() ? true : false;

            return item;
        });
    } else {
        generalComments.map((item: GeneralComment) => {
            item.isSelected = false;
            return item;
        });
    }

    useEffect(() => {
        const generalCommentsFiltered = generalCommentsStore.filter((x) => x.groupCode === props.groupCode);
        setGeneralComments(generalCommentsFiltered);
    }, [generalCommentsStore]);

    const handleChipSelect = (id: number, comment: string) => {
        let selectedComment = "";
        generalComments.map((item: GeneralComment) => {
            item.isSelected = item.id === id ? true : false;
            if (item.isSelected && comment.toLowerCase() === currentComment.toLowerCase()) {
                item.isSelected = false;
                setCurrentComment("");
            }

            if (item.isSelected) {
                setCurrentComment(comment);
                selectedComment = comment;
            }
            return item;
        });

        props.onChipSelect(selectedComment);
        setGeneralComments(generalComments);
    };

    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button
                className={"btn text-dark rounded-0 position-absolute " + styles.expandBtn}
                style={{ right: "0", top: "0", bottom: "0", backgroundColor: "white" }}
                onClick={() => onClick()}>
                {" "}
                <FontAwesomeIcon icon={faChevronRight} />{" "}
            </button>
        );
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button
                className="btn rounded-0 position-absolute"
                style={{ left: "0", top: "0", bottom: "0", backgroundColor: "white" }}
                onClick={() => onClick()}>
                {" "}
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        );
    };

    useEffect(() => {
        const request: IGeneralCommentsByGroupCodeRequest = {
            groupCode: props.groupCode
        };

        dispatch(getGeneralCommentsByGroupCodeAction(request, generalCommentsStore));

        return () => {
            dispatch(clearState(props.groupCode));
        };
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: props.itemsOnDesktop ? props.itemsOnDesktop : 2,
            paritialVisibilityGutter: 60
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: props.itemsOnTablet ? props.itemsOnTablet : 1,
            paritialVisibilityGutter: 50
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: props.itemsOnMobile ? props.itemsOnMobile : 1,
            paritialVisibilityGutter: 30
        }
    };

    return (
        <>
            {/* {generalComments && generalComments.length > 0 ? (
                <span id="commentsPanel">
                <MultiCarousel
                draggable={false}
                keyBoardControl={true}
                customResponsive={responsive}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                className={
                    "row align-items-center " + styles.generalCommentsPanel +" " + (props.additionalClasses && props.additionalClasses)
                }>
                    {generalComments.map(
                        (item: GeneralComment, index: number) => {
                            return (
                                <Chip
                                    text={item.comment}
                                    value={item.id}
                                    className={`mr-2 `}
                                    type={item.isSelected ? "success" : "none"}
                                    selected={item.isSelected}
                                    onClick={() => {
                                        handleChipSelect(item.id, item.comment);
                                    }}
                                />
                            );
                        }
                    )}

                    
                </MultiCarousel>
                </span>
            ) : null} */}
        </>
    );
};

export default GeneralComments;

import React, { useCallback, useMemo, useRef, useState } from "react";
import Slider, { Settings as SliderSettings } from "./react-slick";

type SliderItemData = { type: "screenshot", url: string };

type SliderItemProps = SliderItemData & { nav: boolean, current: boolean };

const SliderItem = (props: SliderItemProps) => {
    return (
        <div className="slide">
            <img src={props.url} alt="Screenshot" />
        </div>
    );
};

export interface GamePreviewMediaRef {
    play: () => void;
    stop: () => void;
}

export const GamePreviewMedia = () => {
    const imageUrls = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Eo_circle_red_number-1.svg/512px-Eo_circle_red_number-1.svg.png?20200417173958",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/512px-Eo_circle_red_number-2.svg.png?20200417174008",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Eo_circle_red_number-3.svg/512px-Eo_circle_red_number-3.svg.png?20200417174018",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Eo_circle_red_number-4.svg/512px-Eo_circle_red_number-4.svg.png?20200417174028",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Eo_circle_red_number-5.svg/512px-Eo_circle_red_number-5.svg.png?20200417174038",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Eo_circle_red_number-6.svg/512px-Eo_circle_red_number-6.svg.png?20200417174050",
    ];
    const slideCount = imageUrls.length;

    const [slideIndex, setSlideIndex] = useState(0);
    const [navSliderSettings, setNavSliderSettings] = useState<SliderSettings>();
    const navSliderRef = useRef<Slider>(null);

    const prev = useCallback(() => navSliderRef.current?.slickPrev(), [navSliderRef]);
    const next = useCallback(() => navSliderRef.current?.slickNext(), [navSliderRef]);

    const viewSliderSettings = useMemo(() => ({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        fade: true,
        arrows: false,
        dots: false,
    } as SliderSettings), []);

    const handleViewSliderRef = useCallback((viewSlider: Slider) => {
        setNavSliderSettings({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: viewSlider,
            centerPadding: "100px",
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
            dots: false,
            afterChange: setSlideIndex,
        });
    }, []);

    const items = useMemo(
        () => imageUrls.map((url) => ({ type: "screenshot", url } as SliderItemData)),
        [imageUrls]);

    return (
        <div className="game_slider">
            <Slider ref={handleViewSliderRef} {...viewSliderSettings} className="game-slider-big has-controls">
                {items.map((item, i) =>
                    <SliderItem key={`${i}_${(item.type)}_${item.url}`} nav={false} current={i === slideIndex} {...item} />)}
            </Slider>
            <div className="game-slider-nav">
                {navSliderSettings !== undefined && (
                    <Slider ref={navSliderRef} {...navSliderSettings} className="slider-box">
                        {items.map((item, i) =>
                            <SliderItem
                                key={`${i}_${(item.type)}_${item.url}`}
                                nav={true}
                                current={i === slideIndex}
                                {...item}
                            />)}
                    </Slider>
                )}
                <div className="slider-control control-back">
                    <button className="slider-button" onClick={prev}>&laquo;</button>
                </div>
                <div className="slider-control control-next">
                    <button className="slider-button" onClick={next}>&raquo;</button>
                </div>
            </div>
        </div>
    );
};

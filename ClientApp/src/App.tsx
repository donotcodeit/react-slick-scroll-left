import React from "react";
import { GamePreviewMedia } from "./GamePreviewMedia";

const Slide = (props: { value: number }) => {
    return <div className="slide">{props.value}</div>
}

export const App = () => {
    return (
        <GamePreviewMedia />
    );
}

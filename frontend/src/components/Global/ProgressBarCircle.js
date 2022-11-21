import { useEffect } from "react";
import { useState } from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";

export const ProgressBarCircle = ({ percentage }) => {
    console.log(percentage,"percentage")
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);

        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    });
    return (
        <SemiCircleProgressBar
            percentage={`${percentage}` }
            showPercentValue
            strokeWidth={`${dimensions.width < 400 ? Number(30) : dimensions.width < 600 ? Number(40) : Number(60)}`}
            stroke="#545B5A"
            background="#BCCBC9"
            diameter={`${dimensions.width < 400 ? 200 : dimensions.width < 600 ? 300 : 400}`}
        />
    );
};

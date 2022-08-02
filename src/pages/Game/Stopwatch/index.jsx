import React from "react";


export const Stopwatch = React.forwardRef((props, ref) => {
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);


    React.useImperativeHandle(ref, () => ({
        reset: () => {
            setTime(0);
        },
        start: () => {
            setRunning(true);
        },
        stop: () => {
            setRunning(false);
        }
    }));



    React.useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);
    return (
        <div className="stopwatch">
            <div className="numbers">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
        </div>
    );
});
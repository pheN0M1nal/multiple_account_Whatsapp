export const HandleOnChangeInput = (e, dataRef, setData, currentData, inputTargetRef = "value") => {
    const tempData = { ...currentData };
    if (typeof e === "string") {
        tempData[dataRef] = e;
    } else {
        tempData[dataRef] = e.target[inputTargetRef];
    }
    setData(tempData);
};

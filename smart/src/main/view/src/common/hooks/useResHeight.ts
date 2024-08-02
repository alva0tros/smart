import { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

interface UseResHeightOpts {
    offset?: number;
    debounceDelay?: number;
}

export const useResHeight = (props: UseResHeightOpts = {}) => {
    const { offset = 300, debounceDelay = 150 } = props;
    const [height, setHeight] = useState(window.innerHeight - offset);
    const updateHeight = useCallback(() => {
        setHeight(window.innerHeight - offset);
    }, [offset]);

    const debouncedUpdateHeight = useMemo(() => debounce(updateHeight, debounceDelay), [updateHeight, debounceDelay]);

    useEffect(() => {
        window.addEventListener("resize", debouncedUpdateHeight);
        return () => {
            window.removeEventListener("resize", debouncedUpdateHeight);
            debouncedUpdateHeight.cancel();
        };
    }, [debouncedUpdateHeight]);

    return height;
};

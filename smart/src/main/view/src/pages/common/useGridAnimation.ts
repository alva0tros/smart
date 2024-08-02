import { useSpring } from "react-spring";
import { useCallback } from "react";

export const useGridAnimation = () => {
    const [styles, api] = useSpring(() => ({
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 0, scale: 0.8 },
        config: { duration: 200 },
    }));

    const startAnimation = useCallback(() => {
        return new Promise<void>((resolve) => {
            api.start({
                to: { opacity: 1, scale: 1 },
                onRest: () => resolve(),
            });
        });
    }, [api]);

    return { styles, startAnimation };
};

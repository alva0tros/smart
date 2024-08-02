import { useState, useCallback } from "react";

interface TrxState {
    isSuccess: boolean;
    isError: boolean;
    errMsg: Record<string, any>;
}

const useTrxState = () => {
    const [trxState, setTrxState] = useState<TrxState>({
        isSuccess: false,
        isError: false,
        errMsg: {},
    });

    const setSuccess = useCallback(() => {
        setTrxState((prev) => ({ ...prev, isSuccess: true, isError: false }));
    }, []);

    const setError = useCallback((errMsg: Record<string, any>) => {
        setTrxState((prev) => ({ ...prev, isSuccess: false, isError: true, errMsg }));
    }, []);

    const resetTrxState = useCallback(() => {
        setTrxState({ isSuccess: false, isError: false, errMsg: {} });
    }, []);

    return { trxState, setSuccess, setError, resetTrxState };
};

export { useTrxState };

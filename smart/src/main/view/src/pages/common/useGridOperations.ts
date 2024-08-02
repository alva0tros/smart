import { ColDef } from "ag-grid-community";
import { useCallback } from "react";

interface GridOperationsProps {
    gridRef: React.RefObject<any>;
    params: any;
    setParams: React.Dispatch<React.SetStateAction<any>>;
    refetch: any;
    mutate: any;
    setError: React.Dispatch<React.SetStateAction<any>>;
}

export const useGridOperations = ({
    gridRef,
    params,
    setParams,
    refetch,
    mutate,
    setError,
}: // setTrxIsError,
// setTrxErrMsg,
GridOperationsProps) => {
    const onFind = useCallback(
        async (formData: any) => {
            await new Promise((resolve) => {
                setParams((prevParams: any) => {
                    const newParams = { ...prevParams, findData: formData, saveData: null };
                    resolve(newParams);
                    return newParams;
                });
            });
            const response = await refetch();
            if (!response.data?.error)
                if (gridRef.current?.api) {
                    gridRef.current?.api.setGridOption("rowData", response.data);
                }
        },
        [gridRef, setParams]
    );

    const onSave = useCallback(async () => {
        const api = gridRef.current?.api;
        if (!api) return;

        try {
            api.stopEditing();

            const requiredFields = api
                .getColumnDefs()
                .filter((colDef: ColDef) => colDef.context?.required)
                .map((colDef: ColDef) => ({ field: colDef.field, header: colDef.headerName }))
                .filter(Boolean);

            const dataToSave: any[] = [];
            const missingFields: Set<string> = new Set();

            api.forEachNodeAfterFilterAndSort((node: any) => {
                if (!node.data.status?.trim()) return;

                const nodeErrors = requiredFields.filter(({ field }: any) => !node.data[field]);
                if (nodeErrors.length) {
                    nodeErrors.forEach(({ header }: any) => missingFields.add(header));
                    node.setDataValue("hasError", true);
                } else {
                    node.setDataValue("hasError", false);

                    console.log("node:", node);
                    dataToSave.push(node.data);
                }
            });

            if (missingFields.size) {
                //api.redrawRows();
                const errorMessage = {
                    message: "다음 필수 입력 항목을 입력해주세요:",
                    cause: Array.from(missingFields).join(", "),
                };
                setError(errorMessage);
                return;
            }

            console.log("dataToSave : ", dataToSave);

            if (dataToSave.length > 0) {
                const updatedParams = { ...params, saveData: dataToSave };
                setParams(updatedParams);
                mutate(updatedParams);
            } else {
                setError("No data to save");
            }
        } catch (error) {
            setError("Error saving data : " + error);
        }
    }, [mutate, gridRef, setParams, params]);

    const handleAddRow = useCallback(
        (initValues?: any) => {
            if (gridRef.current?.api) {
                const api = gridRef.current.api;
                const selectedNodes = api.getSelectedNodes();
                let newIndex = 0;

                if (selectedNodes.length > 0) {
                    const lastSelectedNode = selectedNodes[selectedNodes.length - 1];
                    const displayedRows = api.getDisplayedRowCount();
                    newIndex = lastSelectedNode.rowIndex! + 1;

                    // if (newIndex < displayedRows) {
                    //     const nextNode = api.getDisplayedRowAtIndex(newIndex);
                    //     if (nextNode && nextNode.rowIndex! <= lastSelectedNode.rowIndex!) {
                    //         newIndex = displayedRows;
                    //     }
                    // }
                }

                if (initValues) {
                    const insertRow = { status: "insert", ...initValues };
                    api.applyTransaction({ add: [insertRow], addIndex: newIndex });
                } else {
                    const insertRow = { status: "insert" };
                    api.applyTransaction({ add: [insertRow], addIndex: newIndex });
                }

                setTimeout(() => {
                    const newNode = api.getDisplayedRowAtIndex(newIndex);
                    if (newNode) {
                        newNode.setSelected(true);
                        api.ensureIndexVisible(newIndex);
                    }
                }, 0);
            }
        },
        [gridRef]
    );

    const handleDeleteRows = useCallback(() => {
        if (gridRef.current?.api) {
            const selectedNodes = gridRef.current.api.getSelectedNodes();
            const nodesToRemove: any = [];
            const nodesToDelete: any = [];

            selectedNodes.forEach((node: any) => {
                if (node.data.row_num) {
                    nodesToDelete.push(node);
                } else {
                    nodesToRemove.push(node.data);
                }
            });
            nodesToDelete.forEach((node: any) => {
                node.setDataValue("status", "delete");
            });
            if (nodesToRemove.length > 0) {
                gridRef.current.api.applyTransaction({ remove: nodesToRemove });
            }
        }
    }, [gridRef]);

    return { onFind, onSave, handleAddRow, handleDeleteRows };
};

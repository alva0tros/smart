import React, { useState, useCallback, useMemo, forwardRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { RowValueChangedEvent, RowDoubleClickedEvent, CellValueChangedEvent, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSpring, animated, config } from "react-spring";
import { Loader } from "@/components/loaders/Loader";

const MenuTable: React.FC<any> = forwardRef(({ data, setData, columnDefs, gridHeight, isLoading }, gridRef: any) => {
    const [gridReady, setGridReady] = useState(false);

    const slideIn = useSpring({
        from: {
            transform: "scale(0.8)",
            opacity: 0,
        },
        to: {
            transform: gridReady ? "scale(1)" : "scale(0.8)",
            opacity: gridReady ? 1 : 0,
        },
        config: {
            ...config.gentle,
            duration: 200,
        },
        delay: 50,
    });

    const defaultColDef = useMemo(
        () => ({
            sortable: true,
            filter: false,
            editable: false,
        }),
        []
    );

    const onCellValueChanged = useCallback(
        (event: CellValueChangedEvent) => {
            const updatedData = { ...event.data, isModified: true };
            setData((prevData: any[]) =>
                prevData.map((row) => (row.row_num === updatedData.row_num ? updatedData : row))
            );
        },
        [setData]
    );

    const onRowValueChanged = useCallback(
        (event: RowValueChangedEvent) => {
            const updatedData = { ...event.data, isModified: true };
            setData((prevData: any[]) =>
                prevData.map((row) => (row.row_num === updatedData.row_num ? updatedData : row))
            );
        },
        [setData]
    );

    const onRowDoubleClicked = useCallback(
        (event: RowDoubleClickedEvent) => {
            const { api, rowIndex } = event;
            if (rowIndex !== null) {
                const rowNode = api.getDisplayedRowAtIndex(rowIndex);
                if (rowNode) {
                    const firstEditableColumn = columnDefs.find((col: any) => col.editable !== false);
                    if (firstEditableColumn) {
                        api.startEditingCell({
                            rowIndex: rowIndex,
                            colKey: firstEditableColumn.field as string,
                        });
                    }
                }
            }
        },
        [columnDefs]
    );

    const onGridReady = useCallback((params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();
        setTimeout(() => setGridReady(true), 100);
    }, []);

    return (
        <animated.div style={slideIn}>
            <div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data || []}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={100}
                    paginationPageSizeSelector={[10, 20, 50, 100, 1000]}
                    animateRows={true}
                    cacheQuickFilter={true}
                    enableCellTextSelection={true}
                    suppressCellFocus={false}
                    stopEditingWhenCellsLoseFocus={true}
                    loadingOverlayComponent={Loader}
                    loading={isLoading}
                    rowSelection="multiple"
                    editType="fullRow"
                    onCellValueChanged={onCellValueChanged}
                    onRowValueChanged={onRowValueChanged}
                    onRowDoubleClicked={onRowDoubleClicked}
                    onGridReady={onGridReady}
                    // onFirstDataRendered={(params) => {
                    //     params.api.getDisplayedRowAtIndex(0)?.setSelected(true);
                    // }}
                />
            </div>
        </animated.div>
    );
});

export default MenuTable;

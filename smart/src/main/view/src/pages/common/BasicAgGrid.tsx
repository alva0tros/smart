import { useState, useCallback, useMemo, forwardRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    GridApi,
    CellEditingStartedEvent,
    CellValueChangedEvent,
    GridReadyEvent,
    GridSizeChangedEvent,
    ICellRendererParams,
    RowStyle,
    ModelUpdatedEvent,
    CellFocusedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useKeyPress } from "react-use";
import { animated } from "react-spring";
import { useGridAnimation } from "@/pages/common/useGridAnimation";
import { Loader } from "@/components/loaders/Loader";
import "@/pages/common/BasicAgGrid.css";

interface BasicAgGridProps {
    data: any[];
    columnDefs: ColDef[];
    gridHeight: number;
    isLoading: boolean;
    useCommonFields: string[];
    getSelectedRowData?: (node: any) => void;
    // onCellFocused?: (event: CellFocusedEvent) => void;
}

const BasicAgGrid = forwardRef<AgGridReact, BasicAgGridProps>(
    ({ data, columnDefs, gridHeight, isLoading, useCommonFields, getSelectedRowData }, gridRef) => {
        const { styles, startAnimation } = useGridAnimation();
        const [gridApi, setGridApi] = useState<GridApi | null>(null);
        const [lastFocusedRow, setLastFocusedRow] = useState<number | null>(null);
        const isShiftPressed = useKeyPress("Shift");

        const commonFields: { [key: string]: ColDef } = useMemo(
            () => ({
                indicator: {
                    field: "indicator",
                    headerName: "",
                    maxWidth: 40,
                    cellStyle: { justifyContent: "center" },
                    cellRenderer: (params: ICellRendererParams) => {
                        if (params.node.isSelected()) {
                            return (
                                <i
                                    className="bi bi-chevron-right"
                                    style={{
                                        color: "#DC143C",
                                        fontSize: "0.6rem",
                                        fontWeight: "bold",
                                    }}
                                ></i>
                            );
                        }
                        return null;
                    },
                },
                status: {
                    field: "status",
                    headerName: "상태",
                    maxWidth: 60,
                    cellStyle: { justifyContent: "center" },
                    cellRenderer: (params: any) => {
                        if (params.value === "insert") {
                            return <i className="bi bi-plus-circle" style={{ color: "#28a745" }}></i>;
                        }
                        if (params.value === "update") {
                            return <i className="bi bi-pencil-square" style={{ color: "#17a2b8" }}></i>;
                        }
                        if (params.value === "delete") {
                            return <i className="bi bi-trash" style={{ color: "#dc3545" }}></i>;
                        }
                        return "";
                    },
                },
            }),
            []
        );

        const mergedColumnDefs = useMemo(
            () => [
                ...useCommonFields.map((field: any) => commonFields[field]).filter(Boolean),
                ...columnDefs,
                {
                    field: "hasError",
                    hide: true,
                },
            ],
            [useCommonFields, columnDefs]
        );

        const defaultColDef = useMemo(
            () => ({
                sortable: true,
                filter: false,
                editable: false,
                resizable: true,
                minWidth: 50,

                // headerClass: "ag-header-center",
                headerClass: (params: any) => {
                    return params.colDef.context?.required ? "ag-header-center required-field" : "ag-header-center";
                },
                cellClass: (params: any) => {
                    if (params.colDef.context?.required && !params.value) {
                        return "ag-cell-required";
                    }
                    if (params.data.hasError && params.colDef.context?.required) {
                        return "ag-cell-error";
                    }
                    return "";
                },
            }),
            []
        );

        const getRowStyle = useCallback((params: any): RowStyle => {
            switch (params.data.status) {
                case "insert":
                    return { backgroundColor: "#e6fff2" }; // 연한 녹색
                case "update":
                    return { backgroundColor: "#e6f3ff" }; // 연한 파란색
                case "delete":
                    return { backgroundColor: "#ffe6e6" }; // 연한 빨간색
                default:
                    return {};
            }
        }, []);

        const onSelectionChanged = useCallback(() => {
            if (gridApi) {
                gridApi.refreshCells({
                    columns: ["indicator"],
                    force: true,
                });
            }
        }, [gridApi]);

        const onCellFocused = useCallback(
            (event: CellFocusedEvent) => {
                if (event.rowIndex !== lastFocusedRow) {
                    setLastFocusedRow(event.rowIndex);
                    if (event.rowIndex !== null && event.rowIndex !== undefined) {
                        const node = event.api.getDisplayedRowAtIndex(event.rowIndex);
                        if (node) {
                            node.setSelected(true, !isShiftPressed[0]);
                            if (getSelectedRowData) {
                                getSelectedRowData(node.data);
                            }
                        }
                    }
                }
            },
            [lastFocusedRow, isShiftPressed]
        );

        const onCellEditingStarted = useCallback(
            (event: CellEditingStartedEvent) => {
                if (gridApi) {
                    gridApi.deselectAll();
                    event.node.setSelected(true);
                }
            },
            [gridApi]
        );

        const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
            if (event.column.getColId() !== "status" && event.data.row_num) {
                if (event.newValue !== event.oldValue) {
                    event.node.setDataValue("status", "update");
                }
            }
        }, []);

        const onModelUpdated = useCallback((params: ModelUpdatedEvent) => {
            params.api.sizeColumnsToFit();
        }, []);

        const onGridReady = useCallback((params: GridReadyEvent) => {
            startAnimation();
            setGridApi(params.api);
        }, []);

        const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
            params.api.sizeColumnsToFit();
        }, []);

        return (
            <>
                <animated.div style={{ ...styles, width: "100%" }}>
                    <div className="ag-theme-balham" style={{ height: gridHeight, width: "100%" }}>
                        <AgGridReact
                            ref={gridRef}
                            rowData={data || []}
                            columnDefs={mergedColumnDefs}
                            defaultColDef={defaultColDef}
                            rowHeight={35}
                            headerHeight={40}
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
                            onSelectionChanged={onSelectionChanged}
                            onCellFocused={onCellFocused}
                            onCellEditingStarted={onCellEditingStarted}
                            onCellValueChanged={onCellValueChanged}
                            onGridReady={onGridReady}
                            onModelUpdated={onModelUpdated}
                            onGridSizeChanged={onGridSizeChanged}
                            suppressScrollOnNewData={true}
                            getRowStyle={getRowStyle}
                            // {...(onCellFocused ? { onCellFocused } : {})}
                        />
                    </div>
                </animated.div>
            </>
        );
    }
);

export default BasicAgGrid;

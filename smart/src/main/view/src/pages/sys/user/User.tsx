import React, { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams, CellClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdFolder, MdFolderOpen, MdInsertDriveFile } from "react-icons/md";

interface RowData {
    id: string;
    name: string;
    size: string;
    type: "Folder" | "File";
    parentId?: string;
    expanded?: boolean;
    level: number;
}

const IndentedRenderer: React.FC<ICellRendererParams<RowData>> = (props) => {
    const { value, data } = props;
    if (!data) return null;

    const isFolder = data.type === "Folder";
    const Icon = isFolder ? (data.expanded ? MdFolderOpen : MdFolder) : MdInsertDriveFile;
    const indent = data.level * 20;

    const iconColor = isFolder ? "#4285F4" : "#34A853"; // Google-inspired colors

    return (
        <span style={{ display: "flex", alignItems: "center", paddingLeft: `${indent}px` }}>
            <Icon style={{ marginRight: "5px", fontSize: "1.2em", color: iconColor }} />
            {value}
        </span>
    );
};

const App: React.FC = () => {
    const [rowData, setRowData] = useState<RowData[]>([
        { id: "1", name: "Documents", size: "--", type: "Folder", expanded: true, level: 0 },
        { id: "2", name: "Report.docx", size: "50 KB", type: "File", parentId: "1", expanded: false, level: 1 },
        { id: "3", name: "Pictures", size: "--", type: "Folder", expanded: true, level: 0 },
        { id: "4", name: "vacation.jpg", size: "2 MB", type: "File", parentId: "3", expanded: false, level: 1 },
        { id: "5", name: "family.jpg", size: "1.5 MB", type: "File", parentId: "3", expanded: false, level: 1 },
        { id: "6", name: "Projects", size: "--", type: "Folder", expanded: true, level: 0 },
        { id: "7", name: "Project A", size: "--", type: "Folder", parentId: "6", expanded: true, level: 1 },
        { id: "8", name: "plan.pdf", size: "1 MB", type: "File", parentId: "7", expanded: false, level: 2 },
    ]);

    const onCellClicked = useCallback((event: CellClickedEvent<RowData>) => {
        if (event.data?.type === "Folder") {
            setRowData((prevData) =>
                prevData.map((row) => (row.id === event.data?.id ? { ...row, expanded: !row.expanded } : row))
            );
        }
    }, []);

    const columnDefs = useMemo<ColDef<RowData>[]>(
        () => [
            {
                field: "name",
                headerName: "Name",
                cellRenderer: IndentedRenderer,
                flex: 2,
                onCellClicked: onCellClicked,
            },
            { field: "size", headerName: "Size", flex: 1 },
            { field: "type", headerName: "Type", flex: 1 },
        ],
        [onCellClicked]
    );

    const defaultColDef = useMemo<ColDef>(
        () => ({
            sortable: true,
            filter: true,
            resizable: true,
        }),
        []
    );

    const getRowId = useCallback((params: { data: RowData }) => params.data.id, []);

    const visibleRows = useMemo(() => {
        const isVisible = (row: RowData): boolean => {
            if (!row.parentId) return true;
            const parent = rowData.find((r) => r.id === row.parentId);
            return parent ? Boolean(parent.expanded) && isVisible(parent) : false;
        };
        return rowData.filter(isVisible);
    }, [rowData]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={visibleRows}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                getRowId={getRowId}
            />
        </div>
    );
};

export default App;

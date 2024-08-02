import React, { useState, useEffect, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Card, Col, Row } from "react-bootstrap";
import { useApiQuery, useApiMutation } from "@/common/hooks/useApi";
import { useResHeight } from "@/common/hooks/useResHeight";
import { Error } from "@/components/errors/Error";

// SearchForm 컴포넌트
import MenuForm from "./MenuForm";
import MenuTable from "./MenuTable";

const Header: React.FC = (props: any) => {
    return (
        <div>
            {props.headerName}
            {props.isRequired && <span style={{ color: "red", marginLeft: "5px" }}>*</span>}
        </div>
    );
};

const Menu: React.FC = () => {
    const gridHeight = useResHeight();

    const [params, setParams] = useState<any>({
        beanId: "menuService",
        find: "selectMenuList",
        save: "transactionMenu",
        findData: [],
        saveData: [],
    });

    const [gridData, setGridData] = useState<any[]>([]);
    const gridRef = useRef<AgGridReact | null>(null);
    const columnDefs = useMemo<ColDef[]>(
        () => [
            {
                field: "indicator",
                headerName: "",
                width: 50,
                cellRenderer: (status: any) => {
                    if (status.data.isNew) return "🆕";
                    if (status.data.isModified) return "✏️";
                    if (status.data.isDeleted) return "🗑️";
                    return "";
                },
            },
            { field: "menu_id", headerName: "메뉴ID", hide: true, editable: false },
            { field: "row_num", headerName: "No", width: 80, sortable: true, editable: false },
            {
                field: "menu_cd",
                headerComponent: Header,
                headerComponentParams: {
                    headerName: "메뉴코드",
                    isRequired: true,
                },
                sortable: true,
                editable: true,
            },
            { field: "menu_nm", headerName: "메뉴명", sortable: true, editable: true },
            { field: "menu_desc", headerName: "메뉴설명", sortable: true, editable: true },
            { field: "menu_icon", headerName: "아이콘", sortable: true, filter: true, editable: true },
            {
                field: "menu_srt",
                headerName: "정렬순서",
                sortable: true,
                editable: true,
                cellEditor: "agNumberCellEditor",
                cellEditorParams: {
                    precision: 0, // 정수만 허용
                },
            },
            { field: "menu_url", headerName: "메뉴URL", sortable: true, editable: true },
            {
                field: "use_yn",
                headerName: "사용여부",
                width: 80,
                sortable: true,
                editable: true,
                cellEditor: "agSelectCellEditor",
                cellEditorParams: {
                    values: ["Y", "N"],
                },
            },
        ],
        []
    );

    const { data, isLoading, refetch, isFetching } = useApiQuery(params);
    const { mutate } = useApiMutation(params);

    useEffect(() => {
        if (data && !isLoading) {
            setGridData(data);
            if (gridRef.current?.api) {
                gridRef.current?.api.setGridOption("rowData", data);
            }
        }
    }, [data, isLoading]);

    // if (isLoading || isFetching) {
    //     return <Loader />;
    // }

    if (data?.errCode) {
        return <Error message={`${data.errCode} : ${data.errMsg}`} />;
    }

    return (
        <Row className="row-sm mt-4">
            <Col xl={12}>
                <Card className="custom-card">
                    <Card.Body>
                        <div className="card-title"> 메뉴 </div>
                        <MenuForm
                            gridRef={gridRef}
                            gridData={gridData}
                            setGridData={setGridData}
                            params={params}
                            setParams={setParams}
                            refetch={refetch}
                            mutate={mutate}
                        />
                    </Card.Body>
                </Card>
            </Col>
            <MenuTable
                ref={gridRef}
                data={gridData}
                setData={setGridData}
                columnDefs={columnDefs}
                gridHeight={gridHeight}
                isLoading={isLoading || isFetching}
            />
        </Row>
    );
};

export default Menu;

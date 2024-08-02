import React, { useState, useEffect, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, CellStyle } from "ag-grid-community";
import { Card, Col, Row } from "react-bootstrap";
import { useApiQuery, useApiMutation } from "@/common/hooks/useApi";
import { useTrxState } from "@/pages/common/useTrxState";
import { useResHeight } from "@/common/hooks/useResHeight";
import { SuccessModal, AlertModal } from "@/pages/common/TransModal";
import BasicAgGrid from "@/pages/common/BasicAgGrid";
import MenuForm from "./MenuForm";

const Menu: React.FC = () => {
    const gridHeight = useResHeight({ offset: 300 });
    const [gridData, setGridData] = useState<any[]>([]);
    const { trxState, setSuccess, setError, resetTrxState } = useTrxState();

    const [params, setParams] = useState<any>({
        beanId: "menuService",
        find: "selectMenuList",
        save: "transactionMenu",
        findData: {},
        saveData: [],
    });

    const gridRef = useRef<AgGridReact | null>(null);
    const columnDefs = useMemo<ColDef[]>(
        () => [
            { field: "menu_id", hide: true },
            { field: "level", hide: true },
            { field: "p_menu_id", hide: true },
            { field: "path", hide: true },
            { field: "sort_path", hide: true },
            {
                field: "row_num",
                headerName: "No",
                width: 50,
                sortable: true,
                editable: false,
                cellStyle: { justifyContent: "center" },
            },
            {
                field: "menu_nm",
                headerName: "메뉴명",
                width: 300,
                sortable: true,
                editable: true,
                context: { required: true },
                cellStyle: { fontWeight: "bold" } as CellStyle,
            },
            { field: "menu_url", headerName: "메뉴URL", width: 200, sortable: true, editable: true },
            {
                field: "menu_srt",
                headerName: "정렬순서",
                width: 80,
                sortable: true,
                editable: true,
                context: { required: true },
                cellStyle: { justifyContent: "center" },
                cellEditor: "agNumberCellEditor",
                cellEditorParams: {
                    precision: 0, // 정수만 허용
                },
            },
            { field: "menu_desc", headerName: "메뉴설명", width: 300, sortable: true, editable: true },
            { field: "menu_icon", headerName: "아이콘", width: 200, sortable: true, editable: true },

            {
                field: "enabled_flag",
                headerName: "사용여부",
                width: 100,
                sortable: true,
                editable: true,
                context: { required: true },
                cellStyle: { textAlign: "center" } as CellStyle,
                cellEditor: "agSelectCellEditor",
                cellEditorParams: {
                    values: ["Y", "N"],
                },
            },
        ],
        []
    );

    const { data, isLoading, refetch, isFetching } = useApiQuery(params);
    const { mutate, data: result } = useApiMutation(params);

    useEffect(() => {
        data?.error ? setError(data) : setGridData(data);
    }, [data, isLoading, isFetching]);

    useEffect(() => {
        if (result) {
            result?.error ? setError(result) : setSuccess();
        }
    }, [result]);

    return (
        <>
            <Row className="row-sm mt-4">
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <div className="card-title"> 메뉴 </div>
                            <MenuForm
                                gridRef={gridRef}
                                gridData={gridData}
                                params={params}
                                setParams={setParams}
                                refetch={refetch}
                                mutate={mutate}
                                setError={setError}
                            />
                        </Card.Body>
                    </Card>
                    <BasicAgGrid
                        ref={gridRef}
                        data={gridData}
                        columnDefs={columnDefs}
                        gridHeight={gridHeight}
                        isLoading={isLoading || isFetching}
                        useCommonFields={["indicator", "status"]}
                    />
                </Col>
            </Row>
            <SuccessModal visible={trxState.isSuccess} onClose={resetTrxState} />
            <AlertModal visible={trxState.isError} message={trxState.errMsg} onClose={resetTrxState} />
        </>
    );
};

export default React.memo(Menu);

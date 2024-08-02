import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, CellStyle } from "ag-grid-community";
import { Card, Col, Row } from "react-bootstrap";
import { useApiQuery, useApiMutation } from "@/common/hooks/useApi";
import { useTrxState } from "@/pages/common/useTrxState";
import { useResHeight } from "@/common/hooks/useResHeight";
import { SuccessModal, AlertModal } from "@/pages/common/TransModal";
import BasicAgGrid from "@/pages/common/BasicAgGrid";
import CodeForm from "./CodeForm";

interface CodeProps {
    setSelectedCodeId: (code_id: number | null) => void;
}

const Code: React.FC<CodeProps> = ({ setSelectedCodeId }) => {
    const gridHeight = useResHeight({ offset: 310 });
    const [gridData, setGridData] = useState<any[]>([]);
    const { trxState, setSuccess, setError, resetTrxState } = useTrxState();

    const [params, setParams] = useState<any>({
        beanId: "codeService",
        find: "selectCodeList",
        save: "transactionCode",
        findData: {},
        saveData: [],
    });

    const gridRef = useRef<AgGridReact | null>(null);
    const columnDefs = useMemo<ColDef[]>(
        () => [
            { field: "code_id", hide: true },
            {
                field: "row_num",
                headerName: "No",
                width: 50,
                sortable: true,
                editable: false,
                cellStyle: { justifyContent: "center" },
            },
            {
                field: "code",
                headerName: "코드",
                width: 150,
                sortable: true,
                editable: true,
                context: { required: true },
                cellStyle: { fontWeight: "bold" } as CellStyle,
            },
            {
                field: "code_name",
                headerName: "코드명",
                width: 200,
                sortable: true,
                editable: true,
                context: { required: true },
            },
            { field: "code_desc", headerName: "코드설명", width: 300, sortable: true, editable: true },
            {
                field: "order_seq",
                headerName: "정렬순서",
                width: 100,
                sortable: true,
                editable: true,
                cellStyle: { justifyContent: "center" },
                cellEditor: "agNumberCellEditor",
                cellEditorParams: {
                    precision: 0,
                },
            },
            {
                field: "enabled_flag",
                headerName: "사용여부",
                width: 100,
                sortable: true,
                editable: true,
                context: { required: true },
                cellStyle: { justifyContent: "center" },
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
        if (data?.error) {
            setError(data);
        } else {
            setGridData(data);
            setSelectedCodeId(null);
        }
    }, [data, isLoading, isFetching]);

    useEffect(() => {
        if (result) {
            result?.error ? setError(result) : setSuccess();
        }
    }, [result]);

    const getSelectedRowData = useCallback(
        (rowData: any) => {
            setSelectedCodeId(rowData.code_id);
        },
        [setSelectedCodeId]
    );

    return (
        <>
            <Row className="row-sm mt-4">
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Body>
                            <div className="card-title"> 코드 </div>
                            <CodeForm
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
                        getSelectedRowData={getSelectedRowData}
                    />
                </Col>
            </Row>
            <SuccessModal visible={trxState.isSuccess} onClose={resetTrxState} />
            <AlertModal visible={trxState.isError} message={trxState.errMsg} onClose={resetTrxState} />
        </>
    );
};

export default React.memo(Code);

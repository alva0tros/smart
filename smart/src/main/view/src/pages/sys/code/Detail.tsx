import React, { useState, useEffect, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, CellStyle } from "ag-grid-community";
import { Card, Col, Row } from "react-bootstrap";
import { useApiQuery, useApiMutation } from "@/common/hooks/useApi";
import { useTrxState } from "@/pages/common/useTrxState";
import { useResHeight } from "@/common/hooks/useResHeight";
import { SuccessModal, AlertModal } from "@/pages/common/TransModal";
import BasicAgGrid from "@/pages/common/BasicAgGrid";
import DetailForm from "./DetailForm";

interface DetailProps {
    selectedCodeId: number | null;
}

const CodeDetail: React.FC<DetailProps> = ({ selectedCodeId }) => {
    const gridHeight = useResHeight({ offset: 310 });
    const [gridData, setGridData] = useState<any[]>([]);
    const { trxState, setSuccess, setError, resetTrxState } = useTrxState();

    const [params, setParams] = useState<any>({
        beanId: "codeService",
        find: "selectCodeDetailList",
        save: "transactionCodeDetail",
        findData: {},
        saveData: [],
    });

    const gridRef = useRef<AgGridReact | null>(null);
    const columnDefs = useMemo<ColDef[]>(
        () => [
            { field: "code_detail_id", hide: true },
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
                field: "value",
                headerName: "상세코드",
                width: 150,
                sortable: true,
                editable: true,
                context: { required: true },
                cellStyle: { fontWeight: "bold" } as CellStyle,
            },
            {
                field: "meaning",
                headerName: "상세코드명",
                width: 200,
                sortable: true,
                editable: true,
                context: { required: true },
            },
            {
                field: "order_seq",
                headerName: "정렬순서",
                width: 80,
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
            { field: "attribute_01", headerName: "비고", width: 150, sortable: true, editable: true },
        ],
        []
    );

    const { data, isLoading, refetch, isFetching } = useApiQuery(params);
    const { mutate, data: result } = useApiMutation(params);

    useEffect(() => {
        setParams((prev: any) => ({
            ...prev,
            findData: { ...prev.findData, code_id: selectedCodeId },
        }));
    }, [selectedCodeId]);

    useEffect(() => {
        refetch();
    }, [params]);

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
                            <div className="card-title"> 상세코드 </div>
                            <DetailForm
                                gridRef={gridRef}
                                gridData={gridData}
                                params={params}
                                setParams={setParams}
                                refetch={refetch}
                                mutate={mutate}
                                setError={setError}
                                selectedCodeId={selectedCodeId}
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

export default React.memo(CodeDetail);

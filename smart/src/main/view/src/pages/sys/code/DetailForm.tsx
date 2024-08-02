import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useGridOperations } from "@/pages/common/useGridOperations";
import "@/pages/common/CustomStyle.css";

const DetailForm: React.FC<any> = ({ gridRef, params, setParams, refetch, mutate, setError, selectedCodeId }) => {
    const {
        onFind,
        onSave,
        handleAddRow: hookHandleAddRow,
        handleDeleteRows,
    } = useGridOperations({
        gridRef,
        params,
        setParams,
        refetch,
        mutate,
        setError,
    });

    const { handleSubmit } = useForm();

    const onSubmit = useCallback(
        (formData: any) => {
            onFind(formData);
        },
        [onFind]
    );

    const handleAddRow = useCallback(() => {
        if (selectedCodeId) {
            const initValues = {
                code_id: selectedCodeId,
                enabled_flag: "Y",
            };
            hookHandleAddRow(initValues);
        } else {
            setError("상세코드 등록을 위한 코드를 선택해 주세요.");
        }
    }, [selectedCodeId]);

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="row row-cols-lg-auto g-2 align-items-center justify-content-end"
        >
            <div className="btn-list d-md-flex d-block">
                <div className="btn-list mt-1">
                    <Button
                        onClick={handleAddRow}
                        variant="outline-primary"
                        className="btn-custom-size btn-raised-shadow btn-wave"
                    >
                        <i className="ri-add-line"> </i>추가
                    </Button>
                    <Button
                        onClick={handleDeleteRows}
                        variant="outline-primary"
                        className="btn-custom-size btn-raised-shadow btn-wave"
                    >
                        <i className="ri-delete-bin-2-line"> </i>삭제
                    </Button>
                    <Button onClick={onSave} variant="secondary" className="btn-custom-size btn-raised-shadow btn-wave">
                        <i className="ri-save-line"> </i>저장
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default React.memo(DetailForm);
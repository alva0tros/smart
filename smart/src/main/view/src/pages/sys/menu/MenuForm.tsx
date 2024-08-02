import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { Preference } from "@/common/selectdata";
import { useGridOperations } from "@/pages/common/useGridOperations";

import "@/pages/common/CustomStyle.css";

const MenuForm: React.FC<any> = ({ gridRef, params, setParams, refetch, mutate, setError }) => {
    const { onFind, onSave, handleAddRow, handleDeleteRows } = useGridOperations({
        gridRef,
        params,
        setParams,
        refetch,
        mutate,
        setError,
    });

    const { control, register, handleSubmit } = useForm();

    const onSubmit = useCallback(
        (formData: any) => {
            onFind(formData);
        },
        [onFind]
    );

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="row row-cols-lg-auto g-2 align-items-center justify-content-end"
        >
            <div className="col-12">
                <InputGroup>
                    <InputGroup.Text>메뉴명</InputGroup.Text>
                    <Form.Control {...register("menu_nm")} type="text" size="sm" placeholder="메뉴명 입력" />
                </InputGroup>
            </div>
            <div className="col-12">
                <InputGroup>
                    <InputGroup.Text className="sm">메뉴유형</InputGroup.Text>
                    <Controller
                        name="menu_type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        height: 35,
                                        minHeight: 35,
                                    }),
                                }}
                                options={Preference}
                                placeholder="선택"
                                classNamePrefix="Select2"
                                className="search-panel"
                            />
                        )}
                    />
                </InputGroup>
            </div>
            <div className="btn-list d-md-flex d-block">
                <div className="btn-list mt-1">
                    <Button type="submit" variant="primary" className="btn-custom-size btn-raised-shadow btn-wave">
                        <i className="ri-search-line"> </i>조회
                    </Button>
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

export default React.memo(MenuForm);

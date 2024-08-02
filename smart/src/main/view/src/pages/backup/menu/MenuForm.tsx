import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { Preference } from "@/common/selectdata";
import { useGridOperations } from "@/pages/common/useGridOperations";

const MenuForm: React.FC<any> = ({ gridRef, params, setParams, gridData, setGridData, refetch, mutate }) => {
    const { onFind, onSave, handleAddRow, handleDeleteRows } = useGridOperations({
        gridRef,
        params,
        setParams,
        gridData,
        setGridData,
        refetch,
        mutate,
    });

    const { control, register, handleSubmit } = useForm();

    const onSubmit = (formData: any) => {
        onFind(formData);
    };

    // const onFind = useCallback(
    //     async (formData: any) => {
    //         await new Promise((resolve) => {
    //             setParams((prevParams: any) => {
    //                 const newParams = { ...prevParams, findData: formData };
    //                 resolve(newParams);
    //                 return newParams;
    //             });
    //         });
    //         const result = await refetch();
    //         setGridData(result.data);
    //         if (gridRef.current?.api) {
    //             gridRef.current?.api.setGridOption("rowData", result.data);
    //         }
    //     },
    //     [refetch, setGridData, gridRef, setParams]
    // );

    // const onSave = useCallback(async () => {
    //     gridRef.current.api.stopEditing();

    //     const dataToSave = gridData.filter((row: any) => row.isNew || row.isModified || row.isDeleted);
    //     setParams((prevParams: any) => ({ ...prevParams, saveData: dataToSave }));
    //     await mutate({ ...params, data: dataToSave });

    //     // onFind({});
    // }, [gridData, setGridData, mutate, params, onFind]);

    // const handleAddRow = useCallback(() => {
    //     const newRow = { isNew: true };
    //     setGridData((prevData: any) => [newRow, ...prevData]);

    //     if (gridRef.current?.api) {
    //         gridRef.current.api.applyTransaction({ add: [newRow], addIndex: 0 });
    //         setTimeout(() => {
    //             const rowNode = gridRef.current?.api.getDisplayedRowAtIndex(0);
    //             if (rowNode) {
    //                 rowNode.setSelected(true);
    //                 gridRef.current?.api.startEditingCell({
    //                     rowIndex: 0,
    //                     colKey: gridRef.current.api.getAllDisplayedColumns()[0].getColId(),
    //                     rowMode: "fullRow",
    //                 });
    //             }
    //         }, 100);
    //     }
    // }, [setGridData]);

    // const handleDeleteRows = useCallback(() => {
    //     if (gridRef.current?.api) {
    //         const selectedNodes = gridRef.current.api.getSelectedNodes();
    //         setGridData((prevData: any) =>
    //             prevData.map((row: any) => {
    //                 const selectedNode = selectedNodes.find((node: any) => node.data.row_num === row.row_num);
    //                 if (selectedNode) {
    //                     return { ...row, isDeleted: true };
    //                 }
    //                 return row;
    //             })
    //         );
    //     }
    // }, [setGridData]);

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            className="row row-cols-lg-auto g-2 align-items-center justify-content-end"
        >
            <div className="col-12">
                <InputGroup>
                    <InputGroup.Text>메뉴명</InputGroup.Text>
                    <Form.Control {...register("menu_nm")} type="text" placeholder="메뉴명 입력" />
                </InputGroup>
            </div>
            <div className="col-12">
                <InputGroup>
                    <InputGroup.Text>메뉴유형</InputGroup.Text>
                    <Controller
                        name="menu_type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
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
                    <Button type="submit" variant="primary" className="btn-raised-shadow btn-wave">
                        <i className="ri-search-line"> </i>조회
                    </Button>
                    <Button onClick={handleAddRow} variant="outline-primary" className="btn-raised-shadow btn-wave">
                        <i className="ri-add-line"> </i>추가
                    </Button>
                    <Button onClick={handleDeleteRows} variant="outline-primary" className="btn-raised-shadow btn-wave">
                        <i className="ri-delete-bin-2-line"> </i>삭제
                    </Button>
                    <Button onClick={onSave} variant="secondary" className="btn-raised-shadow btn-wave">
                        <i className="ri-save-line"> </i>저장
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default React.memo(MenuForm);

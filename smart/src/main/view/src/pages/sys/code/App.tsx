import React, { useState, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import Code from "./Code";
import Detail from "./Detail";

const App: React.FC = () => {
    const [selectedCodeId, setSelectedCodeId] = useState<number | null>(null);

    const memoizedSetSelectedCodeId = useCallback((code_id: number | null) => {
        setSelectedCodeId(code_id);
    }, []);

    return (
        <>
            <Row className="row-sm mt-4">
                <Col xl={7}>
                    <Code setSelectedCodeId={memoizedSetSelectedCodeId} />
                </Col>
                <Col xl={5}>
                    <Detail selectedCodeId={selectedCodeId} />
                </Col>
            </Row>
        </>
    );
};

export default React.memo(App);

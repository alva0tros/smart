import React from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Button } from "react-bootstrap";
import "./TransModal.css";

const SuccessModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
    return (
        <Rodal
            visible={visible}
            onClose={onClose}
            animation="door"
            // duration={300}
            height={200} // 고정 높이
            width={250}
            //showMask={true}
            closeMaskOnClick={true}
            className="custom-modal"
            customStyles={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Success</h5>
                    {/* <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button> */}
                </div>
                <div className="modal-body" style={{ flexGrow: 1, overflowY: "auto" }}>
                    {/* <div className="text-center mt-2 mb-2">{icon}</div> */}
                    <div
                        style={{
                            flexGrow: 1,
                            overflowY: "auto",
                        }}
                    >
                        {/* <p className="text-center">{message.cause}</p> */}
                        <h6 className="text-center fw-bold mt-3">{"저장하였습니다."}</h6>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button variant="primary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Rodal>
    );
};

const AlertModal: React.FC<{ visible: boolean; message: any; onClose: () => void }> = ({
    visible,
    message,
    onClose,
}) => {
    const icon = (
        <svg
            className="custom-alert-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="3rem"
            viewBox="0 0 24 24"
            width="3rem"
            fill="#dc3545"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z" />
        </svg>
    );

    return (
        <Rodal
            visible={visible}
            onClose={onClose}
            animation="door"
            // duration={300}
            height={500} // 고정 높이
            width={500}
            //showMask={true}
            closeMaskOnClick={true}
            className="custom-modal"
            customStyles={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Error!</h5>
                    {/* <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button> */}
                </div>
                <div className="modal-body" style={{ flexGrow: 1, overflowY: "auto" }}>
                    <div className="text-center mt-2 mb-2">{icon}</div>
                    <div
                        style={{
                            flexGrow: 1,
                            overflowY: "auto",
                        }}
                    >
                        <div className="text-center">
                            {message?.message && <p>{message.message}</p>}
                            {message?.cause && (
                                <p>
                                    <strong>{message.cause}</strong>
                                </p>
                            )}
                            {!message?.message && !message?.cause && (
                                <p>
                                    {typeof message === "object"
                                        ? JSON.stringify(message)
                                        : String(message) || "No message available"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button variant="primary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Rodal>
    );
};

export { SuccessModal, AlertModal };

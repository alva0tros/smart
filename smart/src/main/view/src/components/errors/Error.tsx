import React from "react";
import { Alert, Button, Card } from "react-bootstrap";

interface ErrorProps {
    message: string;
    onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
    return (
        <Card className="my-3">
            <Card.Body>
                <Alert variant="danger">
                    <Alert.Heading>오류가 발생했습니다</Alert.Heading>
                    <p>{message}</p>
                    {onRetry && (
                        <div className="d-flex justify-content-end">
                            <Button onClick={onRetry} variant="outline-danger">
                                다시 시도
                            </Button>
                        </div>
                    )}
                </Alert>
            </Card.Body>
        </Card>
    );
};

export { Error };

import React from 'react';

interface IndicatorProps {
    data: {
        isNew?: boolean;
        isModified?: boolean;
        isDeleted?: boolean;
    };
}

const Indicator: React.FC<IndicatorProps> = ({ data }) => {
    if (data.isNew) return <span>🆕</span>;
    if (data.isModified) return <span>✏️</span>;
    if (data.isDeleted) return <span>🗑️</span>;
    return null;
};

export { Indicator };
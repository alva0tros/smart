// import React from "react";
// import { FadeLoader } from "react-spinners";

// interface LoaderProps {
//     // loading: boolean;
// }

// const Loader: React.FC<LoaderProps> = () => {
//     //   if (!loading) return null;

//     return (
//         <div
//             style={{
//                 position: "fixed",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명한 검은 배경
//                 zIndex: 9999, // 다른 요소들 위에 표시
//             }}
//         >
//             <FadeLoader
//                 color="#ffffff"
//                 // loading={loading}
//                 aria-label="Loading Spinner"
//                 data-testid="loader"
//             />
//         </div>
//     );
// };

// export { Loader };

import React from "react";
import { FadeLoader } from "react-spinners";

const Loader: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <FadeLoader color="#36D7B7" aria-label="Loading Spinner" data-testid="loader" />
        </div>
    );
};

export { Loader };

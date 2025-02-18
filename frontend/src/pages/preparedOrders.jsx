
// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";

// const OrdersDisplay = () => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <div className="flex h-screen">
//       {showSidebar && <Sidebar />}

//       <div className="flex-1">
//         <div className="flex items-center justify-between p-4 bg-orange-400 text-white">
//           <button
//             onClick={() => setShowSidebar(!showSidebar)}
//             className="p-2 bg-white text-orange-400 rounded-md"
//           >
//             ☰
//           </button>
//           <h1 className=" text-xl font-bold ">Order Prepared</h1>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default OrdersDisplay;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const OrdersDisplay = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}

      <div className="flex-1">
        <div className="flex items-center justify-between p-4 bg-orange-400 text-white">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 bg-white text-orange-400 rounded-md"
          >
            ☰
          </button>
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold">Order Prepared</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDisplay;

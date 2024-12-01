import { Loader2 } from "lucide-react";
import React from "react";

const LoadingScreen = () => {
   return (
      <div className="w-full h-screen fixed top-0 left-0 bg-[#000]/90 flex items-center justify-center">
         <Loader2 className="w-[50px] text-white animate-spin" />
      </div>
   );
};

export default LoadingScreen;

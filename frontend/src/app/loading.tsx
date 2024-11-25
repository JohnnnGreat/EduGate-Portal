import { Loader2 } from "lucide-react";
import React from "react";

const LoadingScreen = () => {
   return (
      <div className="w-full h-screen fixed top-0 left-0 bg-[#000]/60 flex items-center justify-center">
         <Loader2 className="w-9 text-white animate-spin" />
      </div>
   );
};

export default LoadingScreen;

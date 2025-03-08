"use client";

import React from "react";
import { Loader2 } from "lucide-react"; 

export default function SpinningIcon() {
  return (
    <div className="grid place-items-center">
    <Loader2 className="animate-spin h-36 w-36 text-blue-500" />
    </div>
   );
}

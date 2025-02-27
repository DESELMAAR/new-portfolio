
import React, { useRef, useState, useEffect } from 'react';

export function Loading(){
    return(
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-8 border-b-8 border-slate-50"></div>
        </div>
    )
}
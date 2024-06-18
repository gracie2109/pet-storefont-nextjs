import * as React from 'react';
import Image from "next/image";




export default function AppLayout({children}: {children: React.ReactNode}) {
    return (
        <React.Fragment>
            <div id="app_header" className="bg-gray-100 h-16">
              <div id="logo">
                  <img src="/images/logo.png" alt="logo" className="w-20 h-20"/>
              </div>
            </div>
            <div className="relative top-3">
                {children}
            </div>

        </React.Fragment>
    )
}
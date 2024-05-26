import * as React from 'react';




export default function AppLayout({children}: {children: React.ReactNode}) {
    return (
        <React.Fragment>
            <div id="app_header" className="bg-gray-100 h-16">
                Header
            </div>
            <div>
                {children}
            </div>

        </React.Fragment>
    )
}
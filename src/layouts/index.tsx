interface IAppLayoutTemplate {
    children: React.ReactNode;

}


export function AppLayoutTemplate({children}: IAppLayoutTemplate) {
    return (
        <>
            <div className="petshop_header bg-gray-200 h-14 w-full">
                Header
            </div>
            <div className="petshop_content_wrap flex h-screen">
                <div className="petshop_navigation w-40 border border-red-600 relative">
                    <div className="layout_navigation ">
                        layout_navigation
                    </div>
                </div>
                <div className="petshop_content flex-1 relative">
                    {children}
                </div>
            </div>

        </>
    )
}
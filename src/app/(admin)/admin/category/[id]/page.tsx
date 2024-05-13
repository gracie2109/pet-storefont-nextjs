import * as React from 'react';

interface Params  {
    params:{
        id: string
    }
}

export default function CategoryHandlePage({params}: Params) {
    return (
        <React.Fragment>CategoryHandlePage {params.id} </React.Fragment>
    )
}
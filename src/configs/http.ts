const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH",
    url: string,
    options?: any | undefined
) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined
    const baseHeaders = {
        'Content-Type': 'application/json',
    }

    const baseUrl =
        options?.baseUrl === undefined
            ? process.env.NEXT_PUBLIC_API_DEVELOPMENT
            : options.baseUrl

    // const baseUrl = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_PRODUCTIONS : process.env.NEXT_PUBLIC_API_DEVELOPMENT;
    // console.log("APP RUNNING IN ENVIRONMENT", process.env.NODE_ENV, baseUrl);
    const fullUrl = `${baseUrl}${url}`
    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method,
        credentials: "include"
    })
    const payload = await res.json()
    const data = {
        status: res.status,
        payload
    }

    return data
}


const http = {
    get<Response>(
        url: string,
        options?: any | undefined
    ) {
        return request<Response>('GET', url, options)
    },
    post<Response>(
        url: string,
        body: any,
        options?: any | undefined
    ) {
        return request<Response>('POST', url, {...options, body})
    },
    put<Response>(
        url: string,
        body: any,
        options?: any | undefined
    ) {
        return request<Response>('PUT', url, {...options, body})
    },
    patch<Response>(
        url: string,
        body: any,
        options?: any | undefined
    ) {
        return request<Response>('PATCH', url, {...options, body})
    },
    delete<Response>(
        url: string,
        body?: any,
        options?: any | undefined
    ) {
        return request<Response>('DELETE', url, {...options, body})
    }
}

export default http

import { redirect } from 'next/navigation';
const BACKEND_FAIL = "SERVER_FAIL"; // Đặt giá trị mặc định cho trường hợp máy chủ lỗi

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    options?: any | undefined
) => {
    const body = options?.body ? JSON.stringify(options?.body) : undefined;
    const baseHeaders = {
        'Content-Type': 'application/json',
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_DEVELOPMENT ?? ""


    const fullUrl = `${baseUrl}${url}`;
    // try {
        const res = await fetch(fullUrl, {
            ...options,
            headers: {
                ...baseHeaders,
                ...options?.headers,
            },
            body,
            method,
            credentials: "include",
        });
        const payload = await res.json();
        const data = {
            status: res.status,
            payload,
        };
        return data;
    // } catch (error:any) {
    //     return {
    //         status: 500, // Mã lỗi HTTP 500 cho lỗi máy chủ
    //         payload: { error: BACKEND_FAIL }, // Trả về thông báo mặc định cho lỗi máy chủ
    //     };
    // }
};

const http = {
    get<Response>(
        url: string,
        options?: any | undefined
    ) {
        return request<Response>('GET', url, options);
    },
    post<Response>(
        url: string,
        body: any,
        options?: any | undefined
    ) {
        return request<Response>('POST', url, { ...options, body });
    },
    put<Response>(
        url: string,
        body: any,
        options?: any | undefined
    ) {
        return request<Response>('PUT', url, { ...options, body });
    },
    patch<Response>(
        url: string,
        body: any,
        options?: any | undefined
    ) {
        return request<Response>('PATCH', url, { ...options, body });
    },
    delete<Response>(
        url: string,
        body?: any,
        options?: any | undefined
    ) {
        return request<Response>('DELETE', url, { ...options, body });
    },
};

export default http;

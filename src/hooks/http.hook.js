export const useHttp = () => {
    const localToken = localStorage.getItem('TOKEN_AUTH') ? `Bearer ${localStorage.getItem('TOKEN_AUTH')}` : null

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json', 'Authorization': localToken} , credentials = 'include') => {
        if (body !== null){
            body = JSON.stringify(body)
        }
        try {
            const response = await fetch(url, {method, body, headers, credentials, mode: 'cors'});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    return {request}
}
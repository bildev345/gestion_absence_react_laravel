export const loginUser = async (credentiels) => {
    const res = await fetch("/api/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(credentiels)
    });
    const data = await res.json();
    if(!res.ok){
        throw {
            message : data.message,
            statusText : res.statusText,
            status: res.status
        }
    }
    return data;
}
export const logoutUser = async () => {
    return await fetch('/api/logout', {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const getUser = async () => {
    const response = await fetch('/api/user', {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
}
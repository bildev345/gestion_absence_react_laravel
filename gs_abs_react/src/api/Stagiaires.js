export const fetchStagiaires = async({page, perPage, search}, filters) => {
    const params = new URLSearchParams({
        page,
        per_page : perPage,
        search
    });
    if(filters.autorise) {
        params.append('autorise', filters.autorise);
    }
    if(filters.groupe) {
        params.append('groupe_id', filters.groupe);
    }
    const response = await fetch(`/api/stagiaires?${params}`, {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    if(!response.ok){
        throw new Error('Network error');
    }
    return response.json();
}
export const getStagiaire = async (id) => {
    const response = await fetch(`/api/stagiaires/${id}`, {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    if(!response.ok){
        throw {
            message : data.message,
            statusText : response.statusText,
            status: response.status
        }
    }
    return data;
}

export const addStagiaire = async (stagiaire) => {
    const response = await fetch('/api/stagiaires', {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(stagiaire)
    });
    const data = await response.json();
    if(!response.ok){
        throw {
            message : data.errors,
            statusText : response.statusText,
            status : response.status
        }
    }
    return data;
}

export const deleteStagiaire = async (id) => {
    const response = await fetch(`/api/stagiaires/${id}`, {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    if(!response.ok){
        throw {
            message : data.error,
            statusText : response.statusText,
            status : response.status
        }
    }
    return data.message;
}
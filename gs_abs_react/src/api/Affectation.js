export const fetchAffectations = async({page, perPage, search}, filters) => {
    const params = new URLSearchParams({
        page,
        per_page : perPage,
        search
    });
    if(filters.active) {
        params.append('active', filters.active);
    }
    if(filters.formateur) {
        params.append('formateur_id', filters.formateur);
    }
    const response = await fetch(`/api/affectations?${params}`, {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    if(!response.ok){
        throw new Error('Network error');
    }
    return response.json();
}
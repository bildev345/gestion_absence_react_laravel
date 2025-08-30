export const fetchGroupes = async () => {
    const response = await fetch('/api/groupes', {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
}
export const fetchPaginatedGroupes = async ({page, perPage, search}) => {
    const params = new URLSearchParams({
        page,
        per_page : perPage,
        search
    });
    const response = await fetch(`/api/paginatedGr?${params}`, {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    if(!response.ok){
        throw new Error("Network error");
    }
    return await response.json();
}
export const getAllGroupes = async () => {
    const response = await fetch('/api/groupes', {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
}
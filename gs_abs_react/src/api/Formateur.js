export const fetchFormateurs = async () => {
    const response = await fetch('/api/formateurs', {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
}
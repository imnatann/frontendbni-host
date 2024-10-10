export const formatDateIndo = (dateString: string): string => {  
    const options: Intl.DateTimeFormatOptions = {   
        weekday: 'long',   
        year: 'numeric',   
        month: 'long',  
        day: 'numeric'   
    };  
    const date = new Date(dateString);  
    return new Intl.DateTimeFormat('id-ID', options).format(date);  
};  
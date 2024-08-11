export function formatDateString(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()} ${formattedHours}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())} ${ampm}`;
    return formattedDate;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}
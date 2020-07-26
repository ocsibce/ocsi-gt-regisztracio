export const formatDate = (milliseconds: number, type: "short" | "long" | "long-csv"): string => {
    const date = new Date(milliseconds);
    const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    if (type === "long") {
        return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
    }
    if (type === "long-csv") {
        return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
    }
    return `${date.getFullYear()}-${month}-${day}`;
}

interface DateFormatter {
    (dateString: string): string;
}

const dateFormater: DateFormatter = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
export default dateFormater;

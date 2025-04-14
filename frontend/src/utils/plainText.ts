interface PlainTextOptions {
    htmlString: string;
    maxLength: number;
}

const plainText = (htmlString: string, maxLength: number): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const plainText: string = doc.body?.textContent || '';

    return plainText.length > maxLength
        ? plainText.slice(0, maxLength) + '...'
        : plainText;
};
export default plainText;

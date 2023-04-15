const plainText = (htmlString, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const plainText = doc.body.textContent || '';

    return plainText.length > maxLength
        ? plainText.slice(0, maxLength) + '...'
        : plainText;
};
export default plainText;

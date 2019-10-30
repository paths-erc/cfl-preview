const formatColophon = (text, toOl) => {

    const trimText = text => text.replace(/^\s+|\s+$/g, '');
    const formatText = text => text.replace(/\s{2,}/gmi, ' ').replace(/\|/gmi, '\n');
    const lineNr = text => text.replace(/\([0-9]{1,2}\)/gmi, '');
    const stripPathsTags = text => text.replace(/<\/?(?:roleName|p|date|gap|org|quote|rs)[^>]*>/gmi, '');
    const ml2ol = text => '<ol><li>' + text.split("\n").join('</li><li>') + '</li></ol>';
    const tag2link = text => text.replace(/<\s*(?:place|pers)Name[^>]*ref="([^"]+)"[^>]*>(.*?)<\s*\/\s*(?:place|pers)Name>/gi, (match, ref, content) => {
        const ref_parts = ref.split('.');
        if (!ref_parts[1] || !ref_parts[2]){
            return content;
        }
        return `<a href="https://atlas.paths-erc.eu/${ref_parts[1]}/${ref_parts[2]}" target="_blank" rel="noreferrer noopener">${content}</a>`;
    });
    
    text = formatText(text);
    text = lineNr(text);
    text = tag2link(text);
    text = stripPathsTags(text);
    text = trimText(text);
    text = trimText(text);

    if (toOl){
        text = ml2ol(text);
    }
    
    return text;
}

function escapeHTML(html) {
    return html.replace(/[&<>"'\/]/g, function (tag) {
        const replacements = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
        return replacements[tag] || tag;
    });
}
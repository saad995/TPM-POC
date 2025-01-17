const Search = (items: any, term: string) => {
    return items.reduce((acc: any, item: any) => {

        if (contains(item.text, term)) {
            acc.push(item);
        } else if (item.items && item.items.length > 0) {
            let newItems = Search(item.items, term);
            if (newItems && newItems.length > 0) {
                acc.push({
                    text: item.text,
                    items: newItems,
                    expanded: item.expanded
                });
            }
        }
        return acc;
    }, []);
};

const contains = (text: any ="", term: any) => {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
};

export default Search
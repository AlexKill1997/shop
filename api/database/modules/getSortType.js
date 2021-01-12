module.exports = sortType => {
    let response = {}
    const arraySplitSortTypes = sortType.split('-')
    const sortOrder = arraySplitSortTypes[1] == 'up' ? 1 : -1
    switch (arraySplitSortTypes[0]) {
        case 'price':
            response = {
                [`cost`]: sortOrder
            }
            break;
        case 'name':
            response = {
                [`title`]: sortOrder
            }
            break;  
    }
    return response
}
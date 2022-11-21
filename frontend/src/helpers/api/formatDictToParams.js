export const formatQueryDictToQueryParams = (data, prefix = "") => {
    if (!data){
        return ''
    }
    const params = []
    for (let item of Object.keys(data)) {
        params.push(`${item}=${data[item]}`)
    }
    return params.length?`${prefix}${params.join('&')}`:''

}



export const reverseDate= (dt) => {
    if(!dt) return ""
    const [y,m,d]=dt.split('-')
    const newDt=d+'-'+m+'-'+y
    return newDt
}

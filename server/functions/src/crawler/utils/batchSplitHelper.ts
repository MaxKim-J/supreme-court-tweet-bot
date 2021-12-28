export const batchDivider = (arr:any[]) => {
    let result = [];
    for (let i = 0;i<arr.length;i += 100) {
        result.push(arr.slice(i, i+100))
    }
    return result
}


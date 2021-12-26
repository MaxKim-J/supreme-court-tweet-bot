export const arrayDivider = (arr:any[]) => {
    let result = [];
    // 길이를 평가해야함
    for (let i = 0;i<arr.length;i += 100) {
        result.push(arr.slice(i, i+100))
    }
    return result
}


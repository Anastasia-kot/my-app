export let mappingFunction = (arr, argument, changingValue) => {
    return arr.map(
        item => {
            if (item.id === argument) { return { ...item, followed: changingValue } };
            return item
        }
    )
}

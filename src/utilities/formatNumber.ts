/**
 * @dev formats large number to short human readable string 
 */
export const formatNumber = (num: number) => {
    const units = ['K', 'M', 'B', 'T'];

    for (let i = units.length - 1; i >= 0; i--) {
        const decimal = Math.pow(1000, i + 1);

        if (num >= decimal) {
            return (num / decimal).toFixed(1).replace(/\.0$/, '') + units[i];
        }
    }
    console.log(num)
    return String(num);
}

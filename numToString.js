//Function converting number to string
// i.e 123456789 to twelve crores thirty four lakhs fifty six thousand seven hundred and eighty nine.

const numToArray = number => ('' + number).split('')

const numToString = (num) => {

    const ones = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninty'];
    const oneInTens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    const value = {
        0: digit => ones[digit -1] + ' ',
        1: digit => tens[digit - 1] + ' ',
        2: digit => digit === 0 ? '' : ones[digit -1] + ' hundred and ',
        3: digit => digit === 0 ? '' : ones[digit-1] + ' thousand ',
        4: digit => tens[digit - 1] + ' ',
        5: digit => digit === 0 ? '' : digit === 1 ? 'one lakh ' : ones[digit-1] + ' lakhs ',
        6: digit => tens[digit - 1] + ' ',
        7: digit => digit === 0 ? '' : digit === 1 ? 'one crore ' : ones[digit-1] + ' crores ',
        8: digit => tens[digit - 1] + ' ',
    }

    const numArray = numToArray(num);
    rvsStrArray = [];
    let isOneInTens = false;

    numArray.reverse().forEach((ele, index) => {
        let ind = index;
        if (isOneInTens) {
            isOneInTens = false;
        } else {
            if (ind > 8) {
                ind = ind - 7
            }
            if (((ind === 0 || ind === 3) || ind === 5 || ind === 7) && numArray[(index + 1)] === '1') {
                if (ind === 0) {
                    rvsStrArray.push(oneInTens[ele]);
                } else if (ind === 3) {
                    rvsStrArray.push(oneInTens[ele] + ' thousand ');
                } else if(ind === 5){
                    rvsStrArray.push(oneInTens[ele] + ' lakhs ');
                } else {
                    rvsStrArray.push(oneInTens[ele] + ' crores ');
                }
                isOneInTens = true;
            } else {
                func = value[ind];
                rvsStrArray.push(func(ele) !== 'undefined' ? func(ele) : '');
            }
        }
    });
    return rvsStrArray.reverse().reduce((acc, word) => acc + word);
}

console.log(numToString(123456789));
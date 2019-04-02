export default function getWinnnings(combo = [], bet = 10) {
    const res = checkCombo(combo);
    let defRes = 0;
    // user faild
    if (res.weight < 1) return defRes;

    const winnnings = { // weight -> val
    '1': { '7': 10 },
    '2': {
        '1': 100, '2': 200, '3': 300, '4': 400,
        '5': 500, '6': 750, '7': 1000
    },
    '3': {
        '1': 2500, '2': 5000, '3': 15000, '4': 25000,
        '5': 50000, '6': 75000, '7': 1000000
    }
    };
    
    if (winnnings[res.weight] && winnnings[res.weight][res.val]) {
    return winnnings[res.weight][res.val] * bet * .1;
    }
    
    return defRes;
}
/* return weight combo */
export function checkCombo(combo = []) {
    /* (default) user faild */
    const res = { weight: 0 };
    /* check on 3 in a row */
    if (combo[0] === combo[1] && combo[1] === combo[2]) {
    res.val = combo[1];
    res.weight = 3;
    }
    /* check on 2 in a row */
    else if (combo[0] === combo[1] || combo[1] === combo[2]) {
    res.val = combo[1];
    res.weight = 2;
    }
    /* find any value equal 7 */
    else if ( combo.some((val) => val === 7) ) {
    res.val = 7;
    res.weight = 1;
    }

    return res;
}

const getOpponentInput = (opponent) => {
    if (opponent === "Laptop") {
        // return a random value between 1 and 6
        return Math.round(Math.random() * 5) + 1 
    }
}

const checkStrike = (user, oppn) => {
    const u = user - 1;
    const o = oppn - 1;

    const isStrike = (o === (u + 1) % 6) || (o === (u + 5) % 6);
    return isStrike
}

export { getOpponentInput, checkStrike }
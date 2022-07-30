const subtractHours = (numOfHours, date = new Date()) => {
    date.setHours(date.getHours() - numOfHours);
    return date;
}

const subtractDays = (numOfDays, date = new Date()) => {
    date.setDate(date.getDate() - numOfDays);
    return date;
}

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = { subtractDays, subtractHours, sleep}
var accounts = [
    { id: 1, balance: 0 },
    { id: 2, balance: 0 },
    { id: 3, balance: 0 }
];

exports.getAccount = (id) => {
    return accounts.find(x => x.id === parseInt(id));
};

exports.createAccount = (id, balance) => {
    accounts.push({ id: id, balance: balance });
    return { destination: { id: `${id}`, balance: balance } };
};

exports.deposit = (id, amount) => {
    var index = accounts.findIndex(x => x.id === parseInt(id));
    accounts[index].balance = accounts[index].balance + amount;
    return { destination: { id: `${id}`, balance: accounts[index].balance } };
}

exports.withdraw = (id, amount) => {
    var index = accounts.findIndex(x => x.id === parseInt(id));
    accounts[index].balance = accounts[index].balance - amount;
    return { origin: { id: `${id}`, balance: accounts[index].balance } };
}

exports.transfer = (origin, destination, amount) => {
    // var indexOrigin = accounts.findIndex(x => x.id === parseInt(origin)),
    //     indexDestination = accounts.findIndex(x => x.id === parseInt(destination));

    // accounts[indexOrigin].balance = accounts[indexOrigin].balance - amount;
    // accounts[indexDestination].balance = accounts[indexDestination].balance + amount;

    // return { origin: { id: `${origin}`, balance: accounts[indexOrigin].balance }, destination: { id: `${destination}`, balance: accounts[indexDestination].balance } };

    var originResult = this.withdraw(origin, amount),
        destinationResult = this.deposit(destination, amount);

    return { originResult, destinationResult }
}



exports.reset = () => {
    accounts = []
    return 'OK';
}
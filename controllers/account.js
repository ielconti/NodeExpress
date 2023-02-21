const model = require('../models/account')

// Reset state 
exports.reset = (_, res) => {
    const accounts = model.reset();
    res.status(200).send('OK');
}

// Get balance
exports.ballance = (req, res) => {
    const selected = model.getAccount(parseInt(req.query.account_id))

    if (!selected) {
        res.status(404).json(0);
        return
    }
    res.status(200).json(selected.balance);
}

// Create account with initial balance
exports.event = (req, res) => {
    console.log(req.body)
    var selected = null;

    switch (req.body.type) {
        case 'deposit':
            var id = parseInt(req.body.destination),
                amount = parseFloat(req.body.amount)

            selected = model.getAccount(id);

            if (!selected) {
                res.status(201).json(model.createAccount(id, amount));
                break;
            }

            res.status(201).json(model.deposit(id, amount));
            break;

        case 'withdraw':
            var id = parseInt(req.body.origin),
                amount = parseFloat(req.body.amount)

            selected = model.getAccount(id);
            if (!selected) {
                res.status(404).json(0);
                break;
            }

            res.status(201).json(model.withdraw(id, amount));
            break;

        case 'transfer':

            var idOrigin = parseInt(req.body.origin),
                idDestination = parseInt(req.body.destination),
                amount = parseFloat(req.body.amount)

            var selectedOrigin = model.getAccount(idOrigin),
                selecteDestination = model.getAccount(idDestination);

            if (!selectedOrigin) {
                res.status(404).json(0);
                break;
            }

            if (!selecteDestination) {
                model.createAccount(idDestination, 0)
            }

            res.status(201).json(model.transfer(idOrigin, idDestination, amount));
            break;

        default:
            res.status(404).json(0);
            break;
    }
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = exports.updateUserNetworth = exports.getAllPortfolio = exports.sellStock = exports.getPurchasedStock = exports.getAvailableStock = exports.buyStock = exports.deleteWatchlist = exports.getAllWatchlist = exports.checkStockOnWatchlist = exports.addToWatchlist = exports.getUserNetworth = exports.getUserVirtualUsd = exports.assignCoinToUser = exports.user = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
const db_server_1 = require("../config/db-server");
// @desc POST user details & networth
// @route POST /api/user
// @access PRIVATE
exports.user = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email } = req.body;
    const user = yield db_server_1.db.user.create({
        data: {
            id,
            name,
            email
        }
    });
    res.json(user);
}));
// @desc POST give user 100k in portfolio
// @route POST /api/user/addCoin
// @access PRIVATE
exports.assignCoinToUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const addVirtualUsd = yield db_server_1.db.portfolio.create({
        data: {
            stockId: "VirtualUSD",
            amount: 100000,
            stockName: "Virtual USD",
            userId
        }
    });
    res.json(addVirtualUsd);
}));
// @desc GET give user available coins
// @route GET /api/user/vusd
// @access PRIVATE
exports.getUserVirtualUsd = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (typeof id !== "string") {
        throw new Error("Something went wrong! wrong user id.");
    }
    const getVirtualUsd = yield db_server_1.db.portfolio.findFirst({
        where: {
            userId: id,
            stockId: "VirtualUSD"
        },
        select: {
            id: true,
            amount: true,
            stockName: true
        }
    });
    res.json(getVirtualUsd);
}));
// @desc GET  user networth
// @route GET /api/user/networth
// @access PRIVATE
exports.getUserNetworth = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (typeof id !== "string") {
        throw new Error("Something went wrong! wrong user id.");
    }
    const getNetworth = yield db_server_1.db.user.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            networth: true
        }
    });
    res.json(getNetworth);
}));
// @desc POST add stock to watchlist
// @route POST /api/user/watchlist
// @access PRIVATE
exports.addToWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol, id } = req.body;
    const addToWatchlist = yield db_server_1.db.watchlist.create({
        data: {
            stockId: symbol,
            userId: id
        }
    });
    res.json(addToWatchlist);
}));
// @desc POST add stock to watchlist
// @route POST /api/user/watchlist
// @access PRIVATE
exports.checkStockOnWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol, id } = req.query;
    if (typeof id !== "string" || typeof symbol !== "string") {
        throw new Error("Something went wrong!");
    }
    const checkWatchlist = yield db_server_1.db.watchlist.findFirst({
        where: {
            stockId: symbol,
            userId: id
        }
    });
    res.json(checkWatchlist);
}));
// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
exports.getAllWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (typeof id !== "string") {
        throw new Error("Something went wrong!");
    }
    const allWatchlist = yield db_server_1.db.watchlist.findMany({
        where: {
            userId: id
        }
    });
    const watchlistString = allWatchlist.map((stock) => stock.stockId);
    let temp = [];
    for (let index = 0; index < watchlistString.length; index++) {
        const stock = watchlistString[index];
        const result = yield yahoo_finance2_1.default.quoteCombine(stock);
        result.watchlistId = allWatchlist[index].id;
        temp.push(result);
    }
    res.json(temp);
}));
// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
exports.deleteWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId } = req.query;
    if (typeof watchlistId !== "string") {
        throw new Error("Something went wrong!");
    }
    const delWatchlist = yield db_server_1.db.watchlist.delete({
        where: {
            id: watchlistId
        }
    });
    res.json(delWatchlist);
}));
// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
exports.buyStock = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, stockPrice, symbol, stockAmount, name } = req.body;
    // check if the stockPrice is lesser than available virtual usd
    const availableUSD = yield db_server_1.db.portfolio.findFirst({
        where: {
            userId: id,
            stockId: "VirtualUSD"
        }
    });
    if (availableUSD === null) {
        throw new Error("Something went wrong!");
    }
    if (stockPrice > (availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.amount)) {
        throw new Error("Not enough virtual usd!");
    }
    // check if the stock is available in existing portfolio.
    const existingStock = yield db_server_1.db.portfolio.findFirst({
        where: {
            userId: id,
            stockId: symbol
        }
    });
    if (existingStock !== null) {
        console.log(typeof (existingStock === null || existingStock === void 0 ? void 0 : existingStock.amount), typeof (existingStock === null || existingStock === void 0 ? void 0 : existingStock.stockAmount), typeof stockPrice, existingStock === null || existingStock === void 0 ? void 0 : existingStock.amount, stockPrice, (existingStock === null || existingStock === void 0 ? void 0 : existingStock.amount) + stockPrice);
        const updateExistingStock = yield db_server_1.db.portfolio.update({
            data: {
                amount: (existingStock === null || existingStock === void 0 ? void 0 : existingStock.amount) + stockPrice,
                stockAmount: (existingStock === null || existingStock === void 0 ? void 0 : existingStock.stockAmount) + stockAmount
            },
            where: {
                id: existingStock === null || existingStock === void 0 ? void 0 : existingStock.id
            }
        });
        const updateAvailableUSD = yield db_server_1.db.portfolio.update({
            data: {
                amount: Math.round(((availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.amount) - stockPrice) * 1e3) / 1e3
            },
            where: {
                id: availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.id
            }
        });
        res.json(updateExistingStock);
    }
    else {
        const addToPortfolio = yield db_server_1.db.portfolio.create({
            data: {
                stockId: symbol,
                userId: id,
                amount: stockPrice,
                stockName: name,
                stockAmount
            }
        });
        console.log(Math.round(((availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.amount) - stockPrice) * 1e3) / 1e3);
        const updateAvailableUSD = yield db_server_1.db.portfolio.update({
            data: {
                amount: Math.round(((availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.amount) - stockPrice) * 1e3) / 1e3
            },
            where: {
                id: availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.id
            }
        });
        res.json(addToPortfolio);
    }
}));
// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
exports.getAvailableStock = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stockId } = req.query;
    if (typeof stockId !== "string") {
        throw new Error("Something went wrong!");
    }
    const availableStock = yield db_server_1.db.portfolio.findFirst({
        where: {
            stockId: stockId
        }
    });
    res.json(availableStock);
}));
// @desc Get user porto
// @route GET /api/user/watchlist
// @access PRIVATE
exports.getPurchasedStock = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (typeof id !== "string") {
        throw new Error("Something went wrong!");
    }
    const purchasedStock = yield db_server_1.db.portfolio.findMany({
        where: {
            userId: id
        }
    });
    const removeVirtualUsd = purchasedStock.filter((stock) => (stock === null || stock === void 0 ? void 0 : stock.stockId) !== "VirtualUSD");
    res.json(removeVirtualUsd);
}));
// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
exports.sellStock = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, stockPrice, symbol, stockAmount, name } = req.body;
    // check if the amount is lesser than available stockAmount
    const availableStock = yield db_server_1.db.portfolio.findFirst({
        where: {
            userId: id,
            stockId: symbol
        }
    });
    // availableUSD
    const availableUSD = yield db_server_1.db.portfolio.findFirst({
        where: {
            userId: id,
            stockId: "VirtualUSD"
        }
    });
    if (availableStock === null || stockAmount > (availableStock === null || availableStock === void 0 ? void 0 : availableStock.stockAmount)) {
        throw new Error("Not enough stock to sell!");
    }
    if ((availableStock === null || availableStock === void 0 ? void 0 : availableStock.stockAmount) === stockAmount) {
        const updateAvailableUSD = yield db_server_1.db.portfolio.update({
            data: {
                amount: Math.round(((availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.amount) + stockPrice) * 1e3) / 1e3
            },
            where: {
                id: availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.id
            }
        });
        const deleteStock = yield db_server_1.db.portfolio.delete({
            where: {
                id: availableStock === null || availableStock === void 0 ? void 0 : availableStock.id
            }
        });
        res.json(updateAvailableUSD);
    }
    else {
        const updateAvailableUSD = yield db_server_1.db.portfolio.update({
            data: {
                amount: Math.round(((availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.amount) + stockPrice) * 1e3) / 1e3
            },
            where: {
                id: availableUSD === null || availableUSD === void 0 ? void 0 : availableUSD.id
            }
        });
        const updateStock = yield db_server_1.db.portfolio.update({
            data: {
                stockAmount: Math.round(((availableStock === null || availableStock === void 0 ? void 0 : availableStock.stockAmount) - stockAmount) * 1e3) / 1e3,
                amount: (availableStock === null || availableStock === void 0 ? void 0 : availableStock.amount) - stockPrice
            },
            where: {
                id: availableStock === null || availableStock === void 0 ? void 0 : availableStock.id
            }
        });
        res.json(updateAvailableUSD);
    }
}));
// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
exports.getAllPortfolio = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (typeof id !== "string") {
        throw new Error("Something went wrong!");
    }
    const allPortfolio = yield db_server_1.db.portfolio.findMany({
        where: {
            userId: id
        }
    });
    const portfolioString = allPortfolio
        .map((stock) => stock.stockId)
        .filter((stock) => stock !== "VirtualUSD");
    let temp = [];
    for (let index = 0; index < portfolioString.length; index++) {
        const stock = portfolioString[index];
        const result = yield yahoo_finance2_1.default.quoteCombine(stock);
        result.portfolioId = allPortfolio[index].id;
        result.stockAmount = allPortfolio[index].stockAmount;
        result.stockPurchasedPrice = allPortfolio[index].amount;
        temp.push(result);
    }
    res.json(temp);
}));
// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
exports.updateUserNetworth = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const allPortfolio = yield db_server_1.db.portfolio.findMany({
        where: {
            userId: id
        }
    });
    const networth = allPortfolio.reduce((accumulator, currentValue) => accumulator + (currentValue === null || currentValue === void 0 ? void 0 : currentValue.amount), 0);
    const updateNetworth = yield db_server_1.db.user.update({
        data: {
            networth
        },
        where: {
            id
        },
        select: {
            name: true,
            email: true,
            networth: true
        }
    });
    res.json(updateNetworth);
}));
// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
exports.getLeaderboard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topHundred = yield db_server_1.db.user.findMany({
        take: 100,
        orderBy: {
            networth: "desc"
        }
    });
    res.json(topHundred);
}));
//# sourceMappingURL=User.js.map
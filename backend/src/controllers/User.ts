import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import yahooFinance from "yahoo-finance2";
import { db } from "../config/db-server";

// @desc POST user details & networth
// @route POST /api/user
// @access PRIVATE
export const user = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  const user = await db.user.create({
    data: {
      id,
      name,
      email
    }
  });

  res.json(user);
});

// @desc POST give user 100k in portfolio
// @route POST /api/user/addCoin
// @access PRIVATE
export const assignCoinToUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;

  const addVirtualUsd = await db.portfolio.create({
    data: {
      stockId: "VirtualUSD",
      amount: 100000,
      stockName: "Virtual USD",
      userId
    }
  });

  res.json(addVirtualUsd);
});

// @desc GET give user available coins
// @route GET /api/user/vusd
// @access PRIVATE
export const getUserVirtualUsd = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new Error("Something went wrong! wrong user id.");
  }

  const getVirtualUsd = await db.portfolio.findFirst({
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
});

// @desc GET  user networth
// @route GET /api/user/networth
// @access PRIVATE
export const getUserNetworth = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new Error("Something went wrong! wrong user id.");
  }

  const getNetworth = await db.user.findFirst({
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
});

// @desc POST add stock to watchlist
// @route POST /api/user/watchlist
// @access PRIVATE
export const addToWatchlist = asyncHandler(async (req: Request, res: Response) => {
  const { symbol, id } = req.body;

  const addToWatchlist = await db.watchlist.create({
    data: {
      stockId: symbol,
      userId: id
    }
  });

  res.json(addToWatchlist);
});

// @desc POST add stock to watchlist
// @route POST /api/user/watchlist
// @access PRIVATE
export const checkStockOnWatchlist = asyncHandler(async (req: Request, res: Response) => {
  const { symbol, id } = req.query;

  if (typeof id !== "string" || typeof symbol !== "string") {
    throw new Error("Something went wrong!");
  }

  const checkWatchlist = await db.watchlist.findFirst({
    where: {
      stockId: symbol,
      userId: id
    }
  });

  res.json(checkWatchlist);
});

// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
export const getAllWatchlist = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new Error("Something went wrong!");
  }

  const allWatchlist = await db.watchlist.findMany({
    where: {
      userId: id
    }
  });

  const watchlistString = allWatchlist.map((stock) => stock.stockId);

  let temp: Array<object> = [];
  for (let index = 0; index < watchlistString.length; index++) {
    const stock = watchlistString[index];
    const result = await yahooFinance.quoteCombine(stock);
    result.watchlistId = allWatchlist[index].id;

    temp.push(result);
  }

  res.json(temp);
});

// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
export const deleteWatchlist = asyncHandler(async (req: Request, res: Response) => {
  const { watchlistId } = req.query;

  if (typeof watchlistId !== "string") {
    throw new Error("Something went wrong!");
  }

  const delWatchlist = await db.watchlist.delete({
    where: {
      id: watchlistId
    }
  });

  res.json(delWatchlist);
});

// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
export const buyStock = asyncHandler(async (req: Request, res: Response) => {
  const { id, stockPrice, symbol, stockAmount, name } = req.body;

  // check if the stockPrice is lesser than available virtual usd
  const availableUSD = await db.portfolio.findFirst({
    where: {
      userId: id,
      stockId: "VirtualUSD"
    }
  });

  if (availableUSD === null) {
    throw new Error("Something went wrong!");
  }

  if (stockPrice > availableUSD?.amount) {
    throw new Error("Not enough virtual usd!");
  }

  // check if the stock is available in existing portfolio.
  const existingStock = await db.portfolio.findFirst({
    where: {
      userId: id,
      stockId: symbol
    }
  });

  if (existingStock !== null) {
    console.log(
      typeof existingStock?.amount,
      typeof existingStock?.stockAmount,
      typeof stockPrice,
      existingStock?.amount,
      stockPrice,
      existingStock?.amount + stockPrice
    );
    const updateExistingStock = await db.portfolio.update({
      data: {
        amount: existingStock?.amount + stockPrice,
        stockAmount: existingStock?.stockAmount + stockAmount
      },
      where: {
        id: existingStock?.id
      }
    });

    const updateAvailableUSD = await db.portfolio.update({
      data: {
        amount: Math.round((availableUSD?.amount - stockPrice) * 1e3) / 1e3
      },
      where: {
        id: availableUSD?.id
      }
    });

    res.json(updateExistingStock);
  } else {
    const addToPortfolio = await db.portfolio.create({
      data: {
        stockId: symbol,
        userId: id,
        amount: stockPrice,
        stockName: name,
        stockAmount
      }
    });
    console.log(Math.round((availableUSD?.amount - stockPrice) * 1e3) / 1e3);
    const updateAvailableUSD = await db.portfolio.update({
      data: {
        amount: Math.round((availableUSD?.amount - stockPrice) * 1e3) / 1e3
      },
      where: {
        id: availableUSD?.id
      }
    });

    res.json(addToPortfolio);
  }
});

// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
export const getAvailableStock = asyncHandler(async (req: Request, res: Response) => {
  const { stockId } = req.query;

  if (typeof stockId !== "string") {
    throw new Error("Something went wrong!");
  }

  const availableStock = await db.portfolio.findFirst({
    where: {
      stockId: stockId
    }
  });

  res.json(availableStock);
});

// @desc Get user porto
// @route GET /api/user/watchlist
// @access PRIVATE
export const getPurchasedStock = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new Error("Something went wrong!");
  }

  const purchasedStock = await db.portfolio.findMany({
    where: {
      userId: id
    }
  });

  const removeVirtualUsd = purchasedStock.filter((stock) => stock?.stockId !== "VirtualUSD");

  res.json(removeVirtualUsd);
});

// @desc DEL user watchlist
// @route GET /api/user/watchlist
// @access PRIVATE
export const sellStock = asyncHandler(async (req: Request, res: Response) => {
  const { id, stockPrice, symbol, stockAmount, name } = req.body;

  // check if the amount is lesser than available stockAmount
  const availableStock = await db.portfolio.findFirst({
    where: {
      userId: id,
      stockId: symbol
    }
  });

  // availableUSD
  const availableUSD = await db.portfolio.findFirst({
    where: {
      userId: id,
      stockId: "VirtualUSD"
    }
  });

  if (availableStock === null || stockAmount > availableStock?.stockAmount!) {
    throw new Error("Not enough stock to sell!");
  }

  if (availableStock?.stockAmount === stockAmount) {
    const updateAvailableUSD = await db.portfolio.update({
      data: {
        amount: Math.round((availableUSD?.amount + stockPrice) * 1e3) / 1e3
      },
      where: {
        id: availableUSD?.id
      }
    });

    const deleteStock = await db.portfolio.delete({
      where: {
        id: availableStock?.id
      }
    });

    res.json(updateAvailableUSD);
  } else {
    const updateAvailableUSD = await db.portfolio.update({
      data: {
        amount: Math.round((availableUSD?.amount + stockPrice) * 1e3) / 1e3
      },
      where: {
        id: availableUSD?.id
      }
    });

    const updateStock = await db.portfolio.update({
      data: {
        stockAmount: Math.round((availableStock?.stockAmount! - stockAmount) * 1e3) / 1e3,
        amount: availableStock?.amount - stockPrice
      },
      where: {
        id: availableStock?.id
      }
    });

    res.json(updateAvailableUSD);
  }
});

// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
export const getAllPortfolio = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new Error("Something went wrong!");
  }

  const allPortfolio = await db.portfolio.findMany({
    where: {
      userId: id
    }
  });

  const portfolioString = allPortfolio
    .map((stock) => stock.stockId)
    .filter((stock) => stock !== "VirtualUSD");

  let temp: Array<object> = [];
  for (let index = 0; index < portfolioString.length; index++) {
    const stock = portfolioString[index];
    const result = await yahooFinance.quoteCombine(stock);
    result.portfolioId = allPortfolio[index].id;
    result.stockAmount = allPortfolio[index].stockAmount;
    result.stockPurchasedPrice = allPortfolio[index].amount;

    temp.push(result);
  }

  res.json(temp);
});

// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
export const updateUserNetworth = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  const allPortfolio = await db.portfolio.findMany({
    where: {
      userId: id
    }
  });

  const networth = allPortfolio.reduce(
    (accumulator, currentValue) => accumulator + currentValue?.amount,
    0
  );

  const updateNetworth = await db.user.update({
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
});

// @desc GET user watchlist details
// @route GET /api/user/allWatchlist
// @access PRIVATE
export const getLeaderboard = asyncHandler(async (req: Request, res: Response) => {
  const topHundred = await db.user.findMany({
    take: 100,
    orderBy: {
      networth: "desc"
    }
  });

  res.json(topHundred);
});

interface Stock {
    companyName?: string,
    symbol: string,
    todayPrice?: number,
    todayPriceChange?: number,
    todayPricePercentChange?: number,
    price7DaysAgo?: number,
    percentageChange7DaysAgo?: number,
    price30DaysAgo?: number,
    percentageChange30DaysAgo?: number
}

export default Stock;
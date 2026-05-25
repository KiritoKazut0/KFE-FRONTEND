export interface SalesReportItem {
    productId: string;
    productName: string;
    quantitySold: number;
    totalRevenue: number;
}

export interface SalesReport {
    from: Date;
    to: Date;
    sales: SalesReportItem[];
}
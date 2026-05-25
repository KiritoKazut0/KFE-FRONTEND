
export interface SalesReportItemDto {
    productId: string;
    productName: string;
    quantitySold: number;
    totalRevenue: number;
}

export interface SalesReportPeriodDto {
    from: string;
    to: string;
}

export interface SalesReportDataDto{
    period: SalesReportPeriodDto;
    data: SalesReportItemDto[];
}


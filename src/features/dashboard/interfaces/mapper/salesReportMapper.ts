import { SalesReportDataDto } from "../dto/salesReport.dto";
import { SalesReport } from "../models/salesReport.model";

export class SalesReportMapper {
    static toModel(dto: SalesReportDataDto): SalesReport {
        return {
            from: new Date(dto.period.from),
            to: new Date(dto.period.to),
            sales: dto.data.map((item) => ({
                productId: item.productId,
                productName: item.productName,
                quantitySold: item.quantitySold,
                totalRevenue: item.totalRevenue,
            })),
        }
    }
}
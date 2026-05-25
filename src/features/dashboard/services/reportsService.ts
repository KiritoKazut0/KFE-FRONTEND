import api from "@/src/core/http/api";
import { SalesReportMapper } from "../interfaces/mapper/salesReportMapper";
import { handleApiError } from "@/src/core/http/handleApiErros";


const formatDate = (date: Date) =>
  date.toISOString().split("T")[0];

export const getMetrics = async (startDate: Date, endDate: Date) => {
  try {
    const result = await api.get("/orders/metrics/sales", {
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
    });

    return SalesReportMapper.toModel(result.data.data);
  } catch (error) {
    throw new Error(
      handleApiError(error, "Hubo un problema al obtener las métricas")
    );
  }
};
import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../services/reportsService";


export const useGetMetrics = (startDate: Date, endDate: Date) =>
  useQuery({
    queryKey: [
      "metrics",
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0],
    ],
    queryFn: () => getMetrics(startDate, endDate),
  });
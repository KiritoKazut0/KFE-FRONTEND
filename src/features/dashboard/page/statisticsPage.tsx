'use client';

import { useState, useMemo } from "react";
import { Spinner } from "@heroui/react";
import { useGetMetrics } from "../hook/useSales";
import MetricsHeader from "../components/metricsHeader";
import KpiCards from "../components/kpiCards";
import RevenueChart from "../components/revenueChart";
import TopProductsList from "../components/topProductsList";


export default function StatisticsPage() {
    const [appliedDates, setAppliedDates] = useState({
        start: new Date(2026, 4, 1),
        end: new Date(2026, 4, 31)
    });

    const { data: metricsData, isLoading, isError } = useGetMetrics(appliedDates.start, appliedDates.end);
    
    const reportData = metricsData?.sales || [];

    const kpiStats = useMemo(() => {
        const totalRevenue = reportData.reduce((acc, item) => acc + item.totalRevenue, 0);
        const totalItemsSold = reportData.reduce((acc, item) => acc + item.quantitySold, 0);
        
        const topProduct = reportData.length > 0 
            ? reportData.reduce((prev, current) => (prev.quantitySold > current.quantitySold) ? prev : current) 
            : null;

        return {
            totalRevenue,
            totalItemsSold,
            topProductName: topProduct ? topProduct.productName : "Sin datos"
        };
    }, [reportData]);

    const handleApplyDates = (start: Date, end: Date) => {
        setAppliedDates({ start, end });
    };

    if (isError) {
        return <div className="p-10 text-red-500">Hubo un error al cargar las métricas. Intenta de nuevo.</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 px-10 pb-10">
            <MetricsHeader onApplyDates={handleApplyDates} />

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner size="lg" color="default" />
                </div>
            ) : (
                <>
                    <KpiCards
                        totalRevenue={kpiStats.totalRevenue} 
                        totalItemsSold={kpiStats.totalItemsSold} 
                        topProductName={kpiStats.topProductName} 
                    />

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <RevenueChart data={reportData} />
                        <TopProductsList data={reportData} />
                    </div>
                </>
            )}
        </div>
    );
}
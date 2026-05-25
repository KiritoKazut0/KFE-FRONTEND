'use client';

import { DollarSign, Package, Star } from "lucide-react";

interface KpiCardsProps {
    totalRevenue: number;
    totalItemsSold: number;
    topProductName: string;
}

export default function KpiCards({ totalRevenue, totalItemsSold, topProductName }: KpiCardsProps) {
    const kpiCards = [
        { title: "Ingresos Totales", amount: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
        { title: "Productos Vendidos", amount: `${totalItemsSold} uds`, icon: Package },
        { title: "Producto Estrella", amount: topProductName, icon: Star }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiCards.map((kpi, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-zinc-100 rounded-xl">
                            <kpi.icon size={20} className="text-zinc-700" />
                        </div>
                    </div>
                    <h3 className="text-zinc-500 text-sm font-medium">{kpi.title}</h3>
                    <p className="text-2xl font-bold text-zinc-900 mt-1 truncate" title={kpi.amount}>
                        {kpi.amount}
                    </p>
                </div>
            ))}
        </div>
    );
}
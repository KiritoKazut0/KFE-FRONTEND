'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface RevenueChartProps {
    data: any[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)]">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Ingresos por Producto</h3>
            <div className="h-80 w-full">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <XAxis dataKey="productName" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                            <Tooltip 
                                cursor={{fill: '#F4F4F5'}} 
                                contentStyle={{backgroundColor: '#18181B', color: '#fff', borderRadius: '8px', border: 'none'}} 
                                itemStyle={{color: '#fff'}}
                                formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, "Ingresos"]}
                            />
                            <Bar dataKey="totalRevenue" radius={[6, 6, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#18181B' : '#E4E4E7'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
                        No hay datos de ingresos en este periodo.
                    </div>
                )}
            </div>
        </div>
    );
}
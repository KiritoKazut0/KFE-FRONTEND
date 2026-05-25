'use client';

interface TopProductsListProps {
    data: any[];
}

export default function TopProductsList({ data }: TopProductsListProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] flex flex-col">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Top 3 Más Vendidos</h3>
            <div className="flex-1 flex flex-col gap-5">
                {data.length > 0 ? (
                    [...data].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 3).map((item, index) => (
                        <div key={item.productId} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center font-bold text-zinc-900 shrink-0 group-hover:scale-105 transition-transform">
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-zinc-900 text-sm truncate">{item.productName}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">{item.quantitySold} unidades</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="font-bold text-emerald-600 text-sm">${item.totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-zinc-400 text-sm text-center my-auto">Sin ventas en este periodo.</p>
                )}
            </div>
        </div>
    );
}
'use client'
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { ShoppingBag, CreditCard, Banknote, Clock } from "lucide-react";
import StatusTabs from "@/src/features/orders/components/statusTabs";
import { ordersData } from "@/src/features/orders/mocks/ordersMock";
import ActionsTable from "@/src/features/orders/components/actionsTable";
import OrderPaginations from "@/src/features/orders/components/paginationOrders";

export default function OrdersPage() {
    const [page, setPage] = useState(1);
    const totalPages = 8;
    const totalItems = 75;

    const formatOrderId = (uuid: string) => {
        const shortId = uuid.split('-')[0].toUpperCase();
        return `#${shortId}`;
    };

    const renderStatusChip = (status: string) => {
        const styles: Record<string, { color: "success" | "warning" | "danger", label: string }> = {
            "PAID": { color: "success", label: "Pagada" },
            "PENDING": { color: "warning", label: "Pendiente" },
            "CANCELLED": { color: "danger", label: "Cancelada" }
        };
        const config = styles[status] || { color: "default", label: status };

        return (
            <Chip size="sm" variant="flat" color={config.color} className="font-medium">
                {config.label}
            </Chip>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 px-10 pb-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Historial de Órdenes</h1>
                    <p className="text-zinc-500 text-sm mt-1">Monitorea y gestiona los pedidos realizados en tu sucursal.</p>
                </div>
            </div>

            <StatusTabs />

            <div className="bg-white border border-zinc-200 rounded-2xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] overflow-hidden">
                <Table
                    aria-label="Órdenes recientes"
                    removeWrapper
                    className="w-full"
                    classNames={{
                        th: "bg-zinc-50 text-zinc-500 font-semibold px-6 py-4",
                        td: "px-6 py-4"
                    }}
                    bottomContent={

                        <OrderPaginations
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                        />
                    }
                >
                    <TableHeader>
                        <TableColumn>TICKET / FECHA</TableColumn>
                        <TableColumn>CLIENTE</TableColumn>
                        <TableColumn>RESUMEN</TableColumn>
                        <TableColumn>TOTAL</TableColumn>
                        <TableColumn>ESTADO</TableColumn>
                        <TableColumn align="center">ACCIONES</TableColumn>
                    </TableHeader>

                    <TableBody emptyContent={"No hay órdenes para mostrar."}>
                        {ordersData.map((order) => (
                            <TableRow key={order.id} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 transition-colors">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-mono font-bold text-zinc-900 tracking-tight" title={`UUID original: ${order.id}`}>
                                            {formatOrderId(order.id)}
                                        </span>
                                        <div className="flex items-center gap-1 mt-0.5 text-zinc-500">
                                            <Clock size={12} />
                                            <span className="text-xs">{order.date}</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span className="font-medium text-zinc-700">{order.customer}</span>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-zinc-100 rounded-md shrink-0">
                                            <ShoppingBag size={14} className="text-zinc-600" />
                                        </div>
                                        <span className="text-sm text-zinc-600 truncate max-w-50">{order.items}</span>
                                    </div>
                                </TableCell>


                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-zinc-900">${order.amount.toFixed(2)}</span>
                                        <div className="flex items-center gap-1 text-zinc-500 mt-0.5">
                                            {order.payment === "Tarjeta" ? <CreditCard size={12} /> : <Banknote size={12} />}
                                            <span className="text-[11px] uppercase tracking-wider">{order.payment}</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {renderStatusChip(order.status)}
                                </TableCell>


                                <TableCell>
                                    <ActionsTable status={order.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
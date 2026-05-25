'use client';

import { useState } from "react";
import { Button, Popover, PopoverTrigger, PopoverContent, RangeCalendar } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { Calendar } from "lucide-react";

interface MetricsHeaderProps {
    onApplyDates: (start: Date, end: Date) => void;
}

export default function MetricsHeader({ onApplyDates }: MetricsHeaderProps) {
    const [dateRange, setDateRange] = useState<any>({
        start: parseDate("2026-05-01"),
        end: parseDate("2026-05-31")
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleActualizar = () => {
        setIsOpen(false);
        if (dateRange.start && dateRange.end) {
            onApplyDates(
                new Date(dateRange.start.year, dateRange.start.month - 1, dateRange.start.day),
                new Date(dateRange.end.year, dateRange.end.month - 1, dateRange.end.day)
            );
        }
    };

    const formatDisplayDate = () => {
        if (!dateRange || !dateRange.start || !dateRange.end) return "Seleccionar fecha";
        const formatNum = (n: number) => n.toString().padStart(2, '0');
        
        const startStr = `${formatNum(dateRange.start.day)}/${formatNum(dateRange.start.month)}/${dateRange.start.year}`;
        const endStr = `${formatNum(dateRange.end.day)}/${formatNum(dateRange.end.month)}/${dateRange.end.year}`;
        
        return `${startStr} - ${endStr}`;
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
                <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Métricas de Negocio</h1>
                <p className="text-zinc-500 text-sm mt-1">Rendimiento y análisis de ventas de tu sucursal.</p>
            </div>
            
            <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger>
                    <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-zinc-200 shadow-sm cursor-pointer hover:bg-zinc-50 transition-colors">
                        <div className="flex items-center px-3 text-sm text-zinc-600 font-medium">
                            <Calendar size={16} className="mr-2 text-zinc-400" />
                            {formatDisplayDate()}
                        </div>
                        <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                        <Button 
                            size="sm" 
                            className="bg-zinc-900 text-white font-medium rounded-lg px-4"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handleActualizar();
                            }}
                        >
                            Actualizar
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="p-2">
                    <RangeCalendar 
                        aria-label="Selecciona un rango de fechas" 
                        value={dateRange} 
                        onChange={setDateRange} 
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
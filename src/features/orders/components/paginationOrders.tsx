import { Pagination } from "@heroui/react";

interface Props {
    page: number;
    totalPages: number;
    setPage: (newPage: number) => void
}

export default function OrderPaginations({ page, totalPages, setPage }: Props) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-zinc-100 bg-zinc-50/50">
            <span className="text-sm text-zinc-500">
                Página <span className="font-medium text-zinc-900">{page}</span> de{" "}
                <span className="font-medium text-zinc-900">{totalPages}</span>
            </span>
            <Pagination
                isCompact
                showControls
                showShadow={false}
                color="primary"
                page={page}
                total={totalPages}
                onChange={setPage}
                classNames={{
                    cursor: "bg-zinc-900 text-white font-medium",
                }}
            />
        </div>
    );
}
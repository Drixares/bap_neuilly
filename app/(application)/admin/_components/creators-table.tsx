"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
    RiFilter3Line,
    RiMoreLine,
    RiVerifiedBadgeFill,
} from "@remixicon/react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { User } from "better-auth";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

interface GetColumnsProps {
    data: User[];
    setData: React.Dispatch<React.SetStateAction<User[]>>;
}

const getColumns = ({ setData, data }: GetColumnsProps): ColumnDef<User>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Selectionner toutes les lignes"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Selectionner la ligne"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                {row.original.image ? (
                    <Image
                        className="rounded-full"
                        src={row.original.image || ""}
                        width={32}
                        height={32}
                        alt={row.original.name}
                    />
                ) : (
                    <div className="rounded-full bg-zinc-800 size-8 flex items-center justify-center text-zinc-300">
                        {row.original.name.charAt(0)}
                    </div>
                )}
                <div className="font-medium">{row.original.name}</div>
            </div>
        ),
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <p className="text-sm text-muted-foreground">{row.original.id}</p>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        enableHiding: false,
    },
    {
        accessorKey: "verified",
        header: "Vérifié",
        cell: ({ row }) => (
            <div>
                <span className="sr-only">
                    {row.original.emailVerified ? "Vérifié" : "Non Verifié"}
                </span>
                <RiVerifiedBadgeFill
                    size={20}
                    className={cn(
                        row.original.emailVerified
                            ? "fill-emerald-600"
                            : "fill-muted-foreground/50"
                    )}
                    aria-hidden="true"
                />
            </div>
        ),
        size: 90,
    },
    {
        accessorKey: "createdAt",
        header: "Créé le",
        cell: ({ row }) => (
            <p className="text-sm text-muted-foreground">
                {row.original.createdAt.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </p>
        ),
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <RowActions setData={setData} data={data} item={row.original} />
        ),
        enableHiding: false,
    },
];

export function CreatorsTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await authClient.admin.listUsers({
                query: {
                    limit: 100,
                    filterField: "role",
                    filterValue: "user",
                },
            });
            setData(users.data?.users || []);
        };
        fetchUsers();
    }, []);

    const table = useReactTable({
        data,
        columns: getColumns({ setData, data }),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Filtrer par nom..."
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            <RiFilter3Line className="mr-2 h-4 w-4" />
                            Filtrer
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <div
                                        key={column.id}
                                        className="flex items-center space-x-2 py-0.5"
                                    >
                                        <Checkbox
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        />
                                        <Label
                                            htmlFor={column.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {column.id}
                                        </Label>
                                    </div>
                                );
                            })}
                    </PopoverContent>
                </Popover>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
                                    className="h-24 text-center"
                                >
                                    Aucun résultat.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Précédent
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
}

function RowActions({
    setData,
    data,
    item,
}: {
    setData: React.Dispatch<React.SetStateAction<User[]>>;
    data: User[];
    item: User;
}) {
    const [isUpdatePending, startUpdateTransition] = useTransition();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);


    const handleDelete = () => {
        startUpdateTransition(async () => {
            try {
                const { error } = await authClient.admin.removeUser({
                    userId: item.id,
                });

                if (error) {
                    console.error(error.message);
                    return;
                }

                const updatedData = data.filter(
                    (dataItem) => dataItem.id !== item.id
                );

                setData(updatedData);
                setShowDeleteDialog(false);
            } catch (error) {
                console.error(error);
            }
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex justify-end">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="shadow-none text-muted-foreground/60"
                            aria-label="Edit item"
                        >
                            <RiMoreLine
                                className="size-5"
                                size={20}
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-auto">
                    <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        variant="destructive"
                        className="dark:data-[variant=destructive]:focus:bg-destructive/10"
                    >
                        Supprimer le créateur
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Êtes-vous sûr de vouloir supprimer ce créateur ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cette action
                            supprimera définitivement ce créateur.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isUpdatePending}>
                            Annuler
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isUpdatePending}
                            className="bg-destructive text-white shadow-2xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

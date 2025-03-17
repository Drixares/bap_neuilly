import { RemixiconComponentType, RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";

interface StatsCardProps {
    title: string;
    value: string;
    icon: RemixiconComponentType;
    href: string;
}

export function StatsCard({ title, value, icon, href }: StatsCardProps) {
    const Icon = icon;

    return (
        <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-linear-to-b before:from-input/30 before:via-input before:to-input/30 last:before:hidden">
            <div className="relative flex items-center gap-4">
                <RiArrowRightUpLine
                    className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-emerald-500"
                    size={20}
                    aria-hidden="true"
                />
                {/* Icon */}
                <div className="max-[480px]:hidden size-10 shrink-0 rounded-full bg-emerald-600/25 border border-emerald-600/50 flex items-center justify-center text-emerald-500">
                    <Icon />
                </div>
                {/* Content */}
                <div>
                    <Link
                        href={href}
                        className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0"
                    >
                        {title}
                    </Link>
                    <div className="text-2xl font-semibold mb-2">{value}</div>
                </div>
            </div>
        </div>
    );
}

interface StatsGridProps {
    stats: StatsCardProps[];
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 border border-border rounded-xl bg-linear-to-br from-sidebar/60 to-sidebar">
            {stats.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
            ))}
        </div>
    );
}

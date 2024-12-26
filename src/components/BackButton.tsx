"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ButtonHTMLAttributes } from "react"

type Props = {
    title: string,
    className?: string,
    variant?: "default" | "ghost" | "destructive" | "outline" | "link" | "secondary" | null | undefined,
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function BackButton({ title, className, variant, ...props }: Props) {
    const router = useRouter();
    return (
        <Button
            title={title}
            variant={variant}
            className={className}
            onClick={() => router.back()}
        >
            {title}
        </Button>
    )
}
'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const navigate = useRouter()
    return (
        <div className="h-svh">
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                <h1 className="text-[7rem] font-bold leading-tight">404</h1>
                <span className="font-medium">Không tìm thấy trang!</span>
                <p className="text-center text-muted-foreground">
                    Dường như trang bạn tìm kiếm <br />
                    không tồn tại hoặc đã bị xóa
                </p>
                <div className="mt-6 flex gap-4">
                    <Button variant="outline" onClick={() => navigate.back()}>
                        Quay lại
                    </Button>
                    <Button
                        variant="linkHover1"
                        onClick={() => navigate.push('/', { scroll: false })}
                    >
                        Trở về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    )
}

import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loader() {
    return (
        <div>
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#6366F1]" />
            </div>
        </div>
    )
}

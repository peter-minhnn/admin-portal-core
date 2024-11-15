import { toast } from 'sonner'
import { IconClipboardCopy } from '@tabler/icons-react'
import { Prism } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

export default function SyntaxHighlighter({
    content,
}: Readonly<{ content: string }>) {
    const [, copyToClipboard] = useCopyToClipboard()
    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="absolute top-2 right-1 cursor-pointer z-10 bg-transparent hover:bg-transparent"
                            onClick={() => {
                                copyToClipboard(content)
                                toast.success('Copied to clipboard')
                            }}
                        >
                            <IconClipboardCopy size={24} color="white" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copied to clipboard</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Prism language="tsx" style={nord} wrapLines wrapLongLines>
                {content}
            </Prism>
        </div>
    )
}

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SimplePaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function SimplePagination({ page, totalPages, onPageChange }: SimplePaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-between pt-2" aria-label="Pagination">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  )
}
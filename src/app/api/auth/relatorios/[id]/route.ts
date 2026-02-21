import { NextRequest } from 'next/server'
import { DELETE as deleteHandler } from './deleted'

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    return await deleteHandler(request, context)
}

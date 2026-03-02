import { GET as getHandler } from './get'
import { POST as postHandler } from './post'
import { DELETE as deleteHandler } from './delete'

export async function GET() {
  return await getHandler()
}

export async function POST(request: Request) {
  return await postHandler(request)
}

export async function DELETE(request: Request) {
  return await deleteHandler(request)
}

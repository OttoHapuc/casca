import { GET as getHandler } from './get'
import { POST as postHandler } from './post'

export async function GET() {
  return await getHandler()
}

export async function POST(request: Request) {
  return await postHandler(request)
}

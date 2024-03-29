import path from 'path'

export const getIPAdress = () => '127.0.0.1'

export function resolve(dir: string): string {
  return path.join(__dirname, '..', dir)
}

import type {paths} from '@/api/openapi'

declare global {
  export type NavEv_name = Extract<
    x.nav.Ev,
    {type: `nav.to.${string}`}
  >['type']
  type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
  type Endpoint = keyof paths
  type ApiReq<
    M extends Method,
    T extends keyof paths,
  > = paths[T][M]['requestBody']['content']['application/json']
  type ApiRes<
    M extends Method,
    T extends keyof paths,
  > = paths[T][M]['responses']['200']['content']['application/json']
  type ApiErr<
    M extends Method,
    T extends keyof paths,
    S extends number,
  > = {
    json: () => Promise<
      paths[T][M]['responses'][`${S}`]['content']['application/json']
    >
  }
}

export {}

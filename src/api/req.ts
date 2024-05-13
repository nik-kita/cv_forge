const api_url = import.meta.env.VITE_API_URL

const api_request = async <
  M extends Method,
  E extends Endpoint,
>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete',
  access_token?: string,
  body?: ApiReq<M, E>,
  init?: OmitStrict<RequestInit, 'body'>,
) => {
  const response = await fetch(api_url + endpoint, {
    ...init,
    method,
    body: body && JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
      ...(access_token && {
        Authorization: `Bearer ${access_token}`,
      }),
    },
  })

  if (!response.ok) {
    throw response
  }

  return response.json() as Promise<ApiRes<M, E>>
}

export const req = {
  get: async <E extends Endpoint>(
    endpoint: string,
    access_token: string,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'get', E>(
      endpoint,
      'get',
      access_token,
      undefined,
      init,
    ),

  post: async <E extends Endpoint>(
    endpoint: string,
    body: ApiReq<'post', E>,
    access_token: string,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'post', E>(
      endpoint,
      'post',
      access_token,
      body,
      init,
    ),

  put: async <E extends Endpoint>(
    endpoint: string,
    body: ApiReq<'put', E>,
    access_token: string,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'put', E>(
      endpoint,
      'put',
      access_token,
      body,
      init,
    ),

  delete: async <E extends Endpoint>(
    endpoint: string,
    access_token?: string,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'delete', E>(
      endpoint,
      'delete',
      access_token,
      undefined,
      init,
    ),
  public_get: async <E extends Endpoint>(
    endpoint: string,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'get', E>(
      endpoint,
      'get',
      undefined,
      undefined,
      init,
    ),

  public_post: async <E extends Endpoint>(
    endpoint: string,
    body: ApiReq<'post', E>,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'post', E>(
      endpoint,
      'post',
      undefined,
      body,
      init,
    ),

  public_put: async <E extends Endpoint>(
    endpoint: string,
    body: ApiReq<'put', E>,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'put', E>(
      endpoint,
      'put',
      undefined,
      body,
      init,
    ),

  public_delete: async <E extends Endpoint>(
    endpoint: string,
    init?: OmitStrict<RequestInit, 'body'>,
  ) =>
    api_request<'delete', E>(
      endpoint,
      'delete',
      undefined,
      undefined,
      init,
    ),
}

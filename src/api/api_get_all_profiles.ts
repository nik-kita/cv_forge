import {req} from './req'

export const api_get_all_profiles = ({
  access_token,
  nik,
}: {
  access_token: string
  nik: string
}) => req.get<'/profiles/'>('/profiles', access_token)

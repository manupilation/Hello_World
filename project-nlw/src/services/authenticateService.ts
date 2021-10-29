import axios from "axios";
import { response } from "express";
import prismaClient from '../prisma';
/*
1- Receber o code
2- Recuperar o acess_token do github
3- Verifica se o user existe no DB
---SIM: Gera token pra ele
---NAO: Cria no DB, gera um token
Retorna o Token com as infos do user logado
*/
interface IAcessTokenResponse {
  acess_token: string
}

interface userResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string,
}

class authenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token"
    const { data: acessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GIT_ID,
        client_secret: process.env.GIT_KEY,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    });
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${acessTokenResponse.acess_token}`,
      }
    });
    const { name, login, id, avatar_url } = response.data;
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      }
    })
    if(!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        }
      })
    }

    return response.data;
  }
}

export { authenticateUserService };
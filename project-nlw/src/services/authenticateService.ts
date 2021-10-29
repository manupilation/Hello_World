import axios from "axios";
/*
1- Receber o code
2- Recuperar o acess_token do github
3- Verifica se o user existe no DB
---SIM: Gera token pra ele
---NAO: Cria no DB, gera um token
Retorna o Token com as infos do user logado
*/

class authenticateUserService {
  async execute(code: string) {
    
  }
}

export { authenticateUserService };
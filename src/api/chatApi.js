import CRequest  from './chatRequest.js';
let http = new CRequest()
let api = {}
let HOST = 'http://localhost:4005'
let apiConfig = {
    login: `/api/login`,
    register: `/api/register`
}

api.login = (username, password, callback) => {
  http.postRequest(apiConfig.login, { username, password } ,callback)
}

api.register = (username, password, callback) => {
  http.postRequest(apiConfig.register, { username, password } ,callback)
}


export default api
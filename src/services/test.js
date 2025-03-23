import { signUpService, signUpAdminService } from "./AuthService.js";

const testSignUp = async () => {
    const name = 'David'
    const email = 'Daviddd2@gmail.com'
    const password = '123456'
    const result = await signUpAdminService(name, email, password)
    console.log(result.data)
}

testSignUp()

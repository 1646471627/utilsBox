interface UserLogin {
  userName:string,
  password:string,
  remember: boolean,
}
interface UserRegister {
  userName:string,
  password:string,
  rePassword:string,
  remember:boolean,
}
interface UserFindPassword {
  userName:string,
  password:string,
  rePassword:string,
}
interface UserInfo {
  id: string
  userName: string
  nickname: string
  avatar: string
}
export type{UserLogin,UserRegister,UserFindPassword,UserInfo}

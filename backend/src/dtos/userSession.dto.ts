export interface UserSessionDto{
    userId:string
    refreshToken:string
    deviceInfo?:string
    ipAddress?:string
}
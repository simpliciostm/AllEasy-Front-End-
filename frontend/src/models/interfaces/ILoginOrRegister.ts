export interface ILoginOrRegisterProps {
    title: string,
    description: string,
    type: string,
    emailChange: (value: string) => void,
    passwordChange: (value: string) => void,
    username?: (value: string) => void,
    login?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    register?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
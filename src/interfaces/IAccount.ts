export default interface IAccount {
    id: string,
    username: string,
    email: string
}

const defaultAccount : IAccount = {
    email: "",
    id: "",
    username: ""
}

export {
    defaultAccount
}
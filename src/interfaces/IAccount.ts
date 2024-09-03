export default interface IAccount {
    id: string,
    username: string,
    email: string,
    point: number,
}

const defaultAccount : IAccount = {
    email: "",
    id: "",
    username: "",
    point: 0
}

export {
    defaultAccount
}
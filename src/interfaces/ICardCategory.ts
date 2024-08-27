export default interface ICardCategory {
    id: string;
    name: string;
    nCard: number;
};

const defaultCardCategory : ICardCategory = {
    id: "",
    name: "",
    nCard: 0,
}

export {
    defaultCardCategory
}
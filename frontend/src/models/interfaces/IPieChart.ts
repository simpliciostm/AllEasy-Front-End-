export interface ITypePie {
    fieldname: string
    total: number
}

export interface IPieChartProps {
    title: string,
    description: string,
    list: ITypePie[],
    listKeyName: string
    keyBarName: string
}

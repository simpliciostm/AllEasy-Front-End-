export interface ITypeListBar {
    fieldname: string
    total: number
}

export interface IBarChartProps {
    title: string,
    description: string,
    list: ITypeListBar[],
    listKeyName: string
    keyBarName: string
}

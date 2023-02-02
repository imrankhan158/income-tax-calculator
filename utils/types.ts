export type TaxSlab = {
    incomeFrom: number,
    incomeTo?: number,
    taxPercent: number,
}

export type TaxStructure = {
    deductionsApplicable: boolean,
    slabs: TaxSlab[],
    taxRebate: number,
    displayName: string,
}
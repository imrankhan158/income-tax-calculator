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
    standardDeductions: StandardDeduction,
}

export type TaxCalcDeduction = {
    displayName: string,
    value: number,
}

export type StandardDeduction = {
    when: number,
} & TaxCalcDeduction

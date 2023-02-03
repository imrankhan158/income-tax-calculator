import { newTax, oldTax } from "./constants"
import { TaxCalcDeduction, TaxSlab, TaxStructure } from "./types"

export type TaxResult = {
    calc: TaxCalc,
    isGreen: boolean,
    source: TaxStructure,
}

export type TaxCalcStep = {
    slab: TaxSlab,
    displayName: string,
    value: number,
}

function calculateDisplayName(slab: TaxSlab): string {
    if (slab.incomeTo) {
        return `₹${slab.incomeFrom} to ₹${slab.incomeTo}`
    } else {
        return `Above ₹${slab.incomeFrom}`
    }
}

class TaxCalc {
    tax: number = 0;
    slabSteps: TaxCalcStep[] = [];
    income: number;
    taxableIncome: number;
    taxRebate: boolean = false;
    deductions: TaxCalcDeduction[] = [];

    constructor(income: number) {
        this.income = income;
        this.taxableIncome = income;
    }

    setTaxRebate(taxRebate: boolean) {
        this.taxRebate = taxRebate;
    }

    applyDeductions(deduction: TaxCalcDeduction) {
        this.taxableIncome = this.taxableIncome - deduction.value;
        this.deductions.push(deduction) // { displayName: 'Deductions', value: deduction }
    }

    addTax(taxSlabStep: TaxCalcStep) {
        this.tax += taxSlabStep.value;
        this.slabSteps.push(taxSlabStep);
    }
}

export type CalculatorState = {
    isResultVisible: boolean,
    oldTaxRegime?: TaxResult,
    newTaxRegime?: TaxResult,
}

export type ReducerAction = {
    type: string,
    income: number,
    deductions: number,
    addStandardDeduction: boolean,
}

function calculateTax(taxStructure: TaxStructure, income: number, deductions: number, addStandardDeduction: boolean): TaxCalc {
    let taxCalc = new TaxCalc(income);
    if (addStandardDeduction && income >= taxStructure.standardDeductions.when) {
        taxCalc.applyDeductions(taxStructure.standardDeductions)
    }
    if (taxStructure.deductionsApplicable) {
        taxCalc.applyDeductions({ displayName: 'Other deductions', value: deductions })
    }
    if (taxCalc.taxableIncome <= taxStructure.taxRebate) {
        taxCalc.setTaxRebate(true);
        return taxCalc;
    }
    for (let slab of taxStructure.slabs) {
        if (taxCalc.taxableIncome > slab.incomeFrom) {
            if ((slab.incomeTo && taxCalc.taxableIncome <= slab.incomeTo) || !slab.incomeTo) {
                let taxValue = (taxCalc.taxableIncome - slab.incomeFrom) * slab.taxPercent / 100;
                let copiedSlab = structuredClone(slab)
                copiedSlab.incomeTo = taxCalc.taxableIncome
                taxCalc.addTax({ slab: copiedSlab, value: taxValue, displayName: calculateDisplayName(copiedSlab) })
            } else if (slab.incomeTo && taxCalc.taxableIncome > slab.incomeTo) {
                let taxValue = (slab.incomeTo - slab.incomeFrom) * slab.taxPercent / 100;
                taxCalc.addTax({ slab: slab, value: taxValue, displayName: calculateDisplayName(slab) })
            }
        }
    }
    return taxCalc;
}

export function calculatorReducer(state: CalculatorState, action: ReducerAction) {
    if (action.type === "form_submit") {
        let newState: CalculatorState = {
            oldTaxRegime: {
                calc: calculateTax(oldTax, action.income, action.deductions, action.addStandardDeduction),
                isGreen: false,
                source: oldTax,
            },
            newTaxRegime: {
                calc: calculateTax(newTax, action.income, action.deductions, action.addStandardDeduction),
                isGreen: false,
                source: newTax,
            },
            isResultVisible: true,
        }
        if (newState.newTaxRegime!!.calc.tax <= newState.oldTaxRegime!!.calc.tax) {
            newState.newTaxRegime!!.isGreen = true;
        } else if (newState.newTaxRegime!!.calc.tax > newState.oldTaxRegime!!.calc.tax) {
            newState.oldTaxRegime!!.isGreen = true;
        }
        return newState;
    }
    return state;
}
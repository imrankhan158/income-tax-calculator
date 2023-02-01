import { newTax, oldTax } from "./constants"
import { TaxStructure } from "./types"

export type CalculatorState = {
    isResultVisible: boolean,
    oldTaxRegime?: {
        value: number,
        isGreen: boolean,
    },
    newTaxRegime?: {
        value: number,
        isGreen: boolean,
    }
}

export type ReducerAction = {
    type: string,
    income: number,
    deductions: number,
}

function calculateTax(taxStructure: TaxStructure, income: number, deductions: number) {
    let taxableIncome = taxStructure.deductionsApplicable ? (income - deductions) : income;
    if (taxableIncome <= taxStructure.taxRebate) {
        return 0;
    }
    let tax = 0;
    for (let slab of taxStructure.slabs) {
        if (taxableIncome > slab.incomeFrom) {
            if (slab.incomeTo && taxableIncome <= slab.incomeTo) {
                tax += (taxableIncome - slab.incomeFrom) * slab.taxPercent / 100;
            } else if (slab.incomeTo && taxableIncome > slab.incomeTo) {
                tax += (slab.incomeTo - slab.incomeFrom) * slab.taxPercent / 100;
            } else if (!slab.incomeTo) {
                tax += (taxableIncome - slab.incomeFrom) * slab.taxPercent / 100;
            }
        }
    }
    return tax;
}

export function calculatorReducer(state: CalculatorState, action: ReducerAction) {
    if (action.type === "form_submit") {
        let newState = {
            oldTaxRegime: {
                value: calculateTax(oldTax, action.income, action.deductions),
                isGreen: false
            },
            newTaxRegime: {
                value: calculateTax(newTax, action.income, action.deductions),
                isGreen: false
            },
            isResultVisible: true,
        }
        if (newState.newTaxRegime.value < newState.oldTaxRegime.value) {
            newState.newTaxRegime.isGreen = true;
        } else {
            newState.oldTaxRegime.isGreen = true;
        }
        return newState;
    }
    return state;
}
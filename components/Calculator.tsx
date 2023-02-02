'use client';

import { calculatorReducer, TaxResult } from "@/utils/calculator";
import { FormEvent, useReducer, useState } from "react";
import TaxBreakdown from "./moredetails";
import TaxResultView from "./taxresult";

export default function Calculator() {
    const [income, setIncome] = useState<string>('');
    const [deductions, setDeductions] = useState<string>('');
    const [taxBreakdown, setTaxBreakdown] = useState<TaxResult | null>(null);
    const [state, dispatch] = useReducer(calculatorReducer, { isResultVisible: false });

    return (
        <div className='mt-2'>
            <form onSubmit={(event: FormEvent) => {
                event.preventDefault();
                setTaxBreakdown(null);
                dispatch({ type: "form_submit", income: Number(income), deductions: Number(deductions) });
            }}>
                <div>
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 dark:text-white">Income</label>
                    <input required value={income} onChange={(input) => setIncome(input.target.value)} type="number" name="income" id="income" className="mt-1 block w-full flex-1 rounded-md border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm shadow-sm bg-white dark:bg-gray-600" placeholder="eg, 700000" />
                </div>
                <div className="mt-4">
                    <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 dark:text-white">Deductions</label>
                    <input value={deductions} onChange={(input) => setDeductions(input.target.value)} type="number" name="deductions" id="deductions" className="mt-1 block w-full flex-1 rounded-md border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm shadow-sm dark:bg-gray-600" placeholder="eg, 150000" />
                </div>
                <div className="px-4 pt-4 text-center sm:px-6">
                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Calculate</button>
                </div>
            </form>
            {(() => {
                if (state.isResultVisible) {
                    return (
                        <>
                            <div>
                                <div className='flex mt-4'>
                                    <div className="flex-1">
                                        <TaxResultView value={state.oldTaxRegime} onTaxBreakdownClicked={(value) => setTaxBreakdown(value)}/>
                                    </div>
                                    <div className="flex-1">
                                        <TaxResultView value={state.newTaxRegime} onTaxBreakdownClicked={(value) => setTaxBreakdown(value)}/>
                                    </div>
                                </div>
                            </div>
                            {(() => {
                                if (taxBreakdown) {
                                    return (
                                        <div>
                                            <TaxBreakdown value={taxBreakdown} />
                                        </div>
                                    )
                                }
                            })()}
                        </>
                    )
                }
            })()}
        </div>
    )
}

'use client';

import { calculatorReducer, CalculatorState } from "@/utils/calculator";
import { FormEvent, useReducer, useState } from "react";

export default function Calculator() {
    const [income, setIncome] = useState<string>('');
    const [deductions, setDeductions] = useState<string>('');
    const [state, dispatch] = useReducer(calculatorReducer, { isResultVisible: false });
    return (
        <div className='mt-2'>
            <form onSubmit={(event: FormEvent) => {
                event.preventDefault();
                dispatch({type: "form_submit", income: Number(income), deductions: Number(deductions)})
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
                        <div>
                            <div className='flex mt-4'>
                                <div className='flex-1 p-2'>
                                    <div className={`${state.oldTaxRegime?.isGreen ? 'bg-green-100' : 'bg-red-100'} rounded-md p-2 text-center ${state.oldTaxRegime?.isGreen ? 'text-green-900' : 'text-red-900'}`}>
                                        <div>Old tax regime</div>
                                        <div>₹{state.oldTaxRegime?.value}</div>
                                    </div>
                                </div>
                                <div className='flex-1 p-2'>
                                <div className={`${state.newTaxRegime?.isGreen ? 'bg-green-100' : 'bg-red-100'} rounded-md p-2 text-center ${state.newTaxRegime?.isGreen ? 'text-green-900' : 'text-red-900'}`}>
                                        <div>New tax regime</div>
                                        <div>₹{state.newTaxRegime?.value}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })()}
        </div>
    )
}

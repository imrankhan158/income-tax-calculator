import { TaxResult } from "@/utils/calculator"
import { reactIf } from "@/utils/reactIf"

type MoreTaxDetailsProps = {
    value: TaxResult,
}

export default function TaxBreakdown(props: MoreTaxDetailsProps) {
    return (
        <div className="text-sm text-gray-700 dark:text-gray-200">
            <div className="border border-slate-100 dark:border-slate-700 rounded-md mt-4">
                <table className="border-collapse table-auto w-full">
                    <thead>
                        <th colSpan={3} className="border-b dark:border-slate-600 font-medium p-2 pl-2 pb-3 text-slate-500 dark:text-slate-400 text-center">Tax breakdown</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2} className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400 text-right">Income</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400 w-24">₹{props.value.calc.income}</td>
                        </tr>
                        {
                            props.value.calc.deductions.map((deduction, index) => {
                                return (
                                    <tr key={index}>
                                        <td colSpan={2} className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400 text-right">{deduction.displayName}</td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">-₹{deduction.value}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={2} className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400 text-right">Taxable Income</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">₹{props.value.calc.taxableIncome}</td>
                        </tr>
                        {
                            reactIf(props.value.calc.slabSteps.length > 0, () => {
                                return (
                                    <>
                                        <tr>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">Tax Slab</td>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">Tax Rate</td>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400"></td>
                                        </tr>
                                        {
                                            props.value.calc.slabSteps.map((slab, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">{slab.displayName}</td>
                                                        <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">{slab.slab.taxPercent}%</td>
                                                        <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">₹{slab.value}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                        {
                            reactIf(props.value.calc.taxRebate, () => {
                                return (
                                    <tr>
                                        <td colSpan={2} className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400 text-right">Tax Rebate</td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">₹{props.value.source.taxRebate}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={2} className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400 text-right">Payable Tax</td>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 text-slate-500 dark:text-slate-400">₹{props.value.calc.tax}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

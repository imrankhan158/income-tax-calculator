import { TaxResult } from "@/utils/calculator"

type TaxResultViewProps = {
    value: TaxResult | undefined,
    onTaxBreakdownClicked: (value: TaxResult) => void
}

export default function TaxResultView(props: TaxResultViewProps) {
    if (props.value) {
        return (
            <div className='p-2'>
                <div className={`${props.value.isGreen ? 'bg-green-100' : 'bg-red-100'} rounded-md p-2 text-center ${props.value.isGreen ? 'text-green-900' : 'text-red-900'}`}>
                    <div>{props.value.source.displayName}</div>
                    <div>₹{props.value.calc.tax}</div>
                    <button onClick={() => props.onTaxBreakdownClicked(props.value!!)} className={`font-medium mt-2 px-2 py-1 rounded-md ${props.value.isGreen ? 'bg-green-300' : 'bg-red-300'}`}>Show Breakdown</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='p-2'>
                Something went wrong
            </div>
        )
    }
}
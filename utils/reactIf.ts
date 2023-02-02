export function reactIf(condition: boolean, renderIt: () => JSX.Element) {
    if (condition) {
        return renderIt()
    }
}
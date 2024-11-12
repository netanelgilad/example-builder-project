import { ReactElement } from "react";

export function VisualWrapper(props: { children: ReactElement | ReactElement[] }) {
    if (Array.isArray(props.children)) {
        return props.children.map((child, index) => <VisualWrapper key={index}>{child}</VisualWrapper>);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const title = (props.children.type as any).displayName;
    return (
        <fieldset data-testid={title}>
            <legend>{title}</legend>
            {props.children}
        </fieldset>
    )
}
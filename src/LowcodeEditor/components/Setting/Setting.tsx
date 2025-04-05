import {useComponentsStore} from "../../stores/components.tsx";

const Setting = () => {
    const {components} = useComponentsStore();

    return (
        <div>
            <pre>
                {JSON.stringify(components, null, 2)}
            </pre>
        </div>
    )
}

export default Setting
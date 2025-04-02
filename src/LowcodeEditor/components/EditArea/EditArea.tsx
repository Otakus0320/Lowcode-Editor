import {useComponentsStore} from "../../stores/components.tsx";
import {useEffect} from "react";

const EditArea = () => {
    const {components, addComponent, deleteComponent, updateComponentProps} = useComponentsStore();

    useEffect(() => {
        addComponent({
            id: 222,
            name: "aa",
            props: {},
            children: []
        }, 1);
        addComponent({
            id: 333,
            name: "bb",
            props: {},
            children: []
        }, 222)
        setTimeout(() => {
            deleteComponent(333);
        }, 3000)
        updateComponentProps(222, {
            title: 'test'
        })
    }, [])

    return (
        <div>
            Edit Area
            <pre>{JSON.stringify(components, null, 4)}</pre>
        </div>
    )
}

export default EditArea
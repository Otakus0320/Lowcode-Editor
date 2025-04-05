import {useComponentsStore} from "../stores/components.tsx";
import {useComponentConfigStore} from "../stores/component-config.tsx";
import {useDrop} from "react-dnd";

const useMaterialDrop = (accept: string[], id: number) => {
    const {addComponent} = useComponentsStore();
    const {componentConfig} = useComponentConfigStore();

    const [{canDrop}, drop] = useDrop(() => ({
        accept,
        drop: (item: {type: string}, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) return;

            const props = componentConfig[item.type].defaultProps;

            addComponent({
                id: new Date().getTime(),
                name: item.type,
                props
            }, id);
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        })
    }))

    return {canDrop, drop}
}

export default useMaterialDrop
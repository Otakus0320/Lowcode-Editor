import {useComponentConfigStore} from "../../stores/component-config.tsx";
import {useMemo} from "react";
import MaterialItem from "../MateriaItem/MaterialItem.tsx";

const Material = () => {
    const {componentConfig} = useComponentConfigStore();

    const components = useMemo(() => {
        return Object.values(componentConfig);
    }, [componentConfig]);

    return (
        <div>{
            components.map((item, index) => {
                return <MaterialItem name={item.name} key={item.name + index} />
            })
        }</div>
    )
}

export default Material
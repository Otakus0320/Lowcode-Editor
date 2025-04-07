import {useComponentsStore, Component} from "../../stores/components.tsx";
import {useComponentConfigStore} from "../../stores/component-config.tsx";
import * as React from "react";
import {MouseEventHandler, useState} from "react";
import HoverMask from "../HoverMask/HoverMask.tsx";

const EditArea = () => {
    const {components} = useComponentsStore();
    const {componentConfig} = useComponentConfigStore();
    const [hoverComponentId, setHoverComponentId] = useState<number>();

    const renderComponents = (components: Component[]): React.ReactNode=> {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name];

            if(!config?.component) return null;
            return React.createElement(
                config.component,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
    }

    const handleMouseOver: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();

        for (let i = 0; i < path.length; i++) {
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset.componentId;
            if (componentId) {
                setHoverComponentId(+componentId);
                return;
            }
        }
    }

    return (
        <div
            className="h-[100%] edit-area"
            onMouseOver={handleMouseOver}
            onMouseLeave={() => setHoverComponentId(undefined)}
        >
            {renderComponents(components)}
            {hoverComponentId && (
                <HoverMask
                    portalWrapperClassName='portal-wrapper'
                    containerClassName='edit-area'
                    componentId={hoverComponentId}
                />
            )}
            <div className='portal-wrapper'></div>
        </div>
    )
}

export default EditArea
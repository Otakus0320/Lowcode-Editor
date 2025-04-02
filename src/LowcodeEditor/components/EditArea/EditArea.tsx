import {useEffect} from "react";
import {useComponentsStore, Component} from "../../stores/components.tsx";
import {useComponentConfigStore} from "../../stores/component-config.tsx";
import * as React from "react";

const EditArea = () => {
    const {components, addComponent} = useComponentsStore();
    const {componentConfig} = useComponentConfigStore();

    useEffect(() => {
        addComponent({
            id: 222,
            name: 'Container',
            props: {},
            children: []
        }, 1);

        addComponent({
            id: 333,
            name: 'Button',
            props: {
                text: 'button',
            },
            children: []
        }, 222);
    }, [])

    const renderComponents = (components: Component[]): React.ReactNode=> {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name];

            if(!config?.component) return null;
            return React.createElement(
                config.component,
                {
                    key: component.id,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
    }

    return (
        <div className="h-[100%]">
            {/*<pre>{JSON.stringify(components, null, 4)}</pre>*/}
            {renderComponents(components)}
        </div>
    )
}

export default EditArea
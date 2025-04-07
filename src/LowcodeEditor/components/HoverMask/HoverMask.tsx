import {useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import {getComponentById, useComponentsStore} from "../../stores/components.tsx";

interface HoverMaskProps {
    portalWrapperClassName: string;
    containerClassName: string;
    componentId: number;
}

const HoverMask = ({containerClassName, portalWrapperClassName, componentId}: HoverMaskProps) => {
    const [position, setPosition] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        labelTop: 0,
        labelLeft: 0,
    });

    const {components} = useComponentsStore();

    useEffect(() => {
        updatePosition();
    }, [componentId]);

    const updatePosition = () => {
        if (!componentId) return;

        const container = document.querySelector(`.${containerClassName}`);
        if (!container) return;

        const node = document.querySelector(`[data-component-id="${componentId}"]`);
        if (!node) return;

        const {top, left, width, height} = node.getBoundingClientRect();
        const {top: containerTop, left: containerLeft} = container.getBoundingClientRect();

        let labelTop = top - containerTop + container.scrollTop;
        const labelLeft = left - containerLeft + width;

        if (labelTop <=0) labelTop -= -20;

        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollTop,
            width,
            height,
            labelTop,
            labelLeft,
        })
    }

    const el = useMemo(() => {
        return document.querySelector(`.${portalWrapperClassName}`)!
    }, []);

    const curComponent = useMemo(() => {
        return getComponentById(componentId, components)
    }, [componentId])

    return createPortal((
        <>
            <div
                className="absolute bg-[rgba(0,0,255,0.05)] border border-dashed border-blue-500 pointer-events-none rounded z-[12]"
                style={{
                    left: position.left,
                    top: position.top,
                    width: position.width,
                    height: position.height,
                    boxSizing: 'border-box',
                }}
            />
            <div
                className="absolute text-sm z-[13] -translate-x-full -translate-y-full transform"
                style={{
                    left: position.labelLeft,
                    top: position.labelTop,
                    display: (!position.width || position.width < 10) ? "none" : "inline",
                }}
            >
                <div
                    className="px-2 py-0 bg-blue-600 rounded text-white cursor-pointer whitespace-nowrap"
                >
                    {curComponent?.name}
                </div>
            </div>
        </>
    ), el)
}

export default HoverMask;
import {useDrag} from "react-dnd";

export interface MaterialItemProps {
    name: string
}

const MaterialItem = (props: MaterialItemProps) => {
    const {
        name,
    } = props;

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    })

    return (
        <div
            ref={drag}
            className="border-dashed border-[1px] border-black py-[8px] px-[10px] m-[10px] cursor-move inline-block bg-white hover:bg-[#ccc]">
            {name}
        </div>
    )
}

export default MaterialItem
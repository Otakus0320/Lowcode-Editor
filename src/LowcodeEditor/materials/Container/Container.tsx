import {CommonComponentProps} from "../../interface.ts";
import useMaterialDrop from "../../hooks/useMaterialDrop.ts";

const Container = ({id, children}: CommonComponentProps) => {
    const {canDrop, drop} = useMaterialDrop(['Button', 'Container'], id);

    return (
        <div
            ref={drop}
            className={`${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'} min-h-[100px] p-[20px]`}
        >
            {children}
        </div>
    )
}

export default Container
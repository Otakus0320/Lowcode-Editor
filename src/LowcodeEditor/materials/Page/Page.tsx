import {CommonComponentProps} from "../../interface.ts";
import useMaterialDrop from "../../hooks/useMaterialDrop.ts";

const Page = ({id, name, children}: CommonComponentProps) => {
    const {canDrop, drop} = useMaterialDrop(['Button', 'Container'], id)

    return (
        <div
            data-component-id={id}
            ref={drop}
            className='p-[20px] h-[100%] box-border'
            style={{border: canDrop ? '2px solid blue' : 'none'}}
        >
            {children}
        </div>
    )
}

export default Page;
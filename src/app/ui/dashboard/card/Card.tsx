import { FC } from "react"
import { MdSupervisedUserCircle } from "react-icons/md"

interface Props{
    title: string,
    value:number,
    desc: string
}

const Card: FC <Props> = (props) => {
  return (
        <div className=" bg-primary p-2 md:p-5 rounded-xl cursor-pointer flex w-full hover:bg-primary">
            <MdSupervisedUserCircle size={24}/>
            <div className="flex flex-col gap-5">
                <span className="">{props.title}</span>
                <span className="text-[24px] font-[500]">{props.value}</span>
                <span className="text-[14px] font-[300]">
                    <span className="text-lime-400"></span>{props.desc}
                </span>
            </div>
        </div>
  )
}

export default Card
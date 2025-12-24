import { RiHistoryFill } from "react-icons/ri";

const EmptyTransactionInfoCard = (prop) => {
    const { title, description } = prop;

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="flex flex-col items-center text-center max-w-xs">
                <div className="mb-1">
                    <RiHistoryFill className="text-6xl text-gray-600" />
                </div>
                <h5 className="text-lg font-medium">{title}</h5>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}

export default EmptyTransactionInfoCard;
interface IProps {
    value: string;
    onClick: () => void;
}

export default function Square({ value, onClick }: IProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
            text-gray-700 border border-gray-300
            m-2 h-20 w-20
            text-4xl font-bold
            cursor-pointer
            hover:bg-gray-50
            active:bg-gray-200
            rounded-md
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        "
        >
            {value}
        </button>
    );
}

interface IProps {
    value: string;
    onClick: () => void;
}

export default function Square({ value, onClick }: IProps) {
    const textColor = value === "X" ? "text-indigo-500" : value === "O" ? "text-rose-500" : "text-gray-700";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                m-2 h-24 w-24 sm:h-28 sm:w-28
                text-5xl sm:text-6xl font-black
                bg-white border border-gray-100
                shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1
                active:translate-y-0 active:shadow-inner
                rounded-2xl
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-4 focus:ring-indigo-100
                ${textColor}
            `}
        >
            {value}
        </button>
    );
}

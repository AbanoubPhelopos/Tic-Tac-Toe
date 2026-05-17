//complete with tailwindcss class styles
interface IProps {
    value?: string;

}

export default function Square({ value }: IProps) {
    return <button className="border border-gray-300 m-2 h-20 w-20 text-4xl font-bold cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {value}
    </button>;
}

function ArrowVertical({color, rotate}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="14"
            fill="none"
            viewBox="0 0 8 18"
            transform={`rotate(${rotate})`}
        >
            <path
                fill={color}
                d="M3.646 17.354a.5.5 0 00.708 0l3.182-3.182a.5.5 0 10-.708-.708L4 16.293l-2.828-2.829a.5.5 0 10-.708.708l3.182 3.182zM3.5 0v17h1V0h-1z"
            ></path>
        </svg>
    );
}

export default ArrowVertical;
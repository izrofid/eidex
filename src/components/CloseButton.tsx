function CloseButton({
    onClick,
    className = "",
    size = 24,
  }: {
    onClick: () => void;
    className?: string;
    size?: number;
  }) {
    return (
      <button
        className={`text-gray-400 hover:text-red-800 focus:outline-none ${className}`}
        onClick={onClick}
        aria-label="Close"
        type="button"
        style={{ lineHeight: 0 }}
      >
        <svg
          xmlns="https://www.w3.org/2000/svg"
          className={`h-${size / 4} w-${size / 4}`}
          width={size}
          height={size}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );
  }

  export default CloseButton;
const Button = (props) => {
    const { children, className, onClick } = props;
  
    return (
      <button
        className={`h-10 px-6 font-semibold rounded-md ${className} text-white`}
        type="submit"
        onClick={onClick}
      >
        {children}
      </button>
    );
};

export default Button;
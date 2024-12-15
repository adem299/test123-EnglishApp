const Button = (props) => {
    const { children, className } = props;
  
    return (
      <button
        className={`h-10 px-6 font-semibold rounded-md ${className} text-white`}
        type="submit"
      >
        {children}
      </button>
    );
};

export default Button;
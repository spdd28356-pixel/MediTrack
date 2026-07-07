const Button = ({ variant = "primary", size = "medium", children, ...props }) => {
  return (
    <button className={`button button--${variant} button--${size}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

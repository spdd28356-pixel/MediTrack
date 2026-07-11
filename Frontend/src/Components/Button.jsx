const Button = ({ variant = "primary", size = "medium", children, className = "", ...props }) => {
  const classes = ["button", `button--${variant}`, `button--${size}`, className].filter(Boolean).join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;

const PageContainer = ({ id, children, className, style }) => {
    return (
      <div
        id={id}
        style={{ ...style }}
        className={`!container !max-w-[1300px] px-4 !mx-auto ${className}`}
      >
        {children}
      </div>
    );
  };
  export default PageContainer;
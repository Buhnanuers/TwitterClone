const PageContent = ({ title, children }) => {
  return (
    <div className="text-white">
      <h1 className="text-primary">{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;

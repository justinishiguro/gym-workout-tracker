import './PageWrapper.css';

export default function PageWrapper({ children, title }) {
  return (
    <div className="page-wrapper">
      {title && <h1 className="page-title">{title}</h1>}
      {children}
    </div>
  );
}

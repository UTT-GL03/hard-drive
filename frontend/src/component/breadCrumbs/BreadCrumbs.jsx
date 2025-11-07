import { useDrive } from "../context/DriveContext.jsx";

const BreadCrumbs = () => {
  const { path, goToFolder } = useDrive();

  return (
    <div className="breadcrumbs">
      <span className="breadcrumb-item" onClick={() => goToFolder(null)}>
        Mon Drive
      </span>
      {path.map(({uid, name}) => (
        <span key={uid}>
          <span className="breadcrumb-separator"> {">"} </span>
          <span
            className="breadcrumb-item"
            onClick={() => goToFolder(uid, name)}
          >
            {name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbs;

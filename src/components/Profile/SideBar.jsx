import "./SideBar.css";

const SideBar = ({ currentUser }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__avatar">
        {currentUser.avatar ? (
          <img src={currentUser.avatar} alt="Avatar" />
        ) : (
          <div className="sidebar__avatar-placeholder" />
        )}
      </div>
      <div className="sidebar__info">
        <h2 className="sidebar__name">{currentUser.name}</h2>
      </div>
    </aside>
  );
};

export default SideBar;

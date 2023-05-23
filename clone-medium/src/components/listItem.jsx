import SaveIcon from "../assets/icons/save";

function ListItem({ item }) {
  return (
    <div className="list-item">
      <div className="left-item">
        <div className="header">
          <img
            src="https://miro.medium.com/v2/resize:fill:40:40/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
            alt=""
          />
          <h3>Medium Staff in 3 Min Read</h3>
        </div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <div className="footer">
          <p>Mar 24</p> • <p>4 min read</p> • <p>Medium</p>
          <SaveIcon></SaveIcon>
        </div>
      </div>
      <img src={item.image} alt="" />
    </div>
  );
}
export default ListItem;

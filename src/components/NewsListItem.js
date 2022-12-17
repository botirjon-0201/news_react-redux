import React from "react";

function NewsListItem({ name, description, category, onDelete }) {
  let elementClassName, srcImg;
  switch (category) {
    case "Hot News":
      elementClassName = "bg-danger bg-gradient";
      srcImg =
        "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
      break;
    case "Sport News":
      elementClassName = "bg-primary bg-gradient";
      srcImg =
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
      break;
    case "Business News":
      elementClassName = "bg-success bg-gradient";
      srcImg =
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
      break;
    case "Green News":
      elementClassName = "bg-secondary bg-gradient";
      srcImg =
        "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
      break;
    default:
      elementClassName = "bg-info bg-gradient";
      srcImg =
        "https://images.unsplash.com/photo-1498644035638-2c3357894b10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
  }
  return (
    <li
      className={`card flex-row shadow-lg text-white my-2 ${elementClassName}`}
    >
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <img
        src={srcImg}
        alt="News img"
        className="img-fluid w-25 d-inline"
        style={{ objectFit: "cover" }}
      />
      <span className="position-absolute top-0 end-90 translate-middle badge border rounded-pill bg-light">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onDelete}
        ></button>
      </span>
    </li>
  );
}

export default NewsListItem;

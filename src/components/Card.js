import { Link } from "react-router-dom";

export default function Card({ img, title, desc, cta, link, ctaanother,linkanother }) {
  return (
    <article className="card">
      <img src={img} alt="" loading="lazy" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <Link to={link}>
        <button>{cta}</button>
      </Link>
      <Link to={linkanother}>
        <button>{ctaanother}</button>
      </Link>
    </article>
  );
}

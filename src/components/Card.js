export default function Card({ img, title, desc, cta }) {
  return (
    <article className="card">
      <img src={img} alt="" loading="lazy" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>{cta}</button>
    </article>
  );
}

import "./About.css";

function About() {
  return (
    <div className="about-canvas">
      <main className="about-main">
  <section className="about-identity">
    {/* <span className="about-label">
      HUMAN / IDEAS / MACHINE / POSSIBILITIES
    </span> */}

    <h1 className="about-name">
      DECODING 
      <br />
      <span>THE</span>
      <br />
      UNKNOWN
    </h1>

    <p className="about-role">
      AI / MACHINE LEARNING ENGINEER
    </p>

    <p className="about-description">
      Curious by nature, driven by questions, and fascinated by how intelligence works.
      I turn curiosity into experiments, ideas into code, and concepts into things that exist.
    </p>

    <div className="about-status">
      <span className="status-indicator" />
      LEARN   |   EXPERIMENT   |   CREATE
    </div>
  </section>
</main>

    </div>
  );
}

export default About;
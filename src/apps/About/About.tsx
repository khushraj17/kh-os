import "./About.css";

function About() {
  return (
    <div className="about-app">
      <div className="about-profile">
        <div className="about-profile-image">
          <img src="/images/profile_img.jpg" alt="Khushraj Rane" />
        </div>

        <div className="about-profile-info">
          <span className="about-eyebrow">USER PROFILE / 001</span>

          <h1>Khushraj Rane</h1>

          <p className="about-role">
            AI & Machine Learning Engineer
          </p>

          <span className="about-location">
            Bhopal, India
          </span>
        </div>
      
      </div>
      <div className="about-introduction">
  <span className="about-eyebrow">01 / INTRODUCTION</span>

  <h2>
    Curiosity drives
    <span> my code.</span>
  </h2>

  <p>
    I'm an engineering student focused on understanding how
    intelligent systems work and turning ideas into practical
    applications. I enjoy exploring AI, solving problems, and
    building software that has a purpose.
  </p>
</div>
    </div>
  );
}

export default About;
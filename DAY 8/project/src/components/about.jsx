import styles from "../styles/About.module.css";

function About() {
  return (
    <section className={styles.about}>
      <h2>About Me</h2>
      <p><strong>Education:</strong> B.Tech in Computer Science</p>
      <p><strong>Skills:</strong> React, JavaScript, HTML, CSS</p>
    </section>
  );
}

export default About;
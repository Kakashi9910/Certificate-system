import CertificateForm from "./CertificateForm";

export default function App() {
  return (
    <div style={styles.container}>
      <h2>📜 Certificate Generator</h2>
      <CertificateForm />
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif"
  }
};

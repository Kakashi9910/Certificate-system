import { useState } from "react";
import { generateCertificate } from "./api";

const initialState = {
  name: "",
  email: "",
  gstNumber: "",
  businessName: "",
  businessAddress: ""
};

export default function CertificateForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await generateCertificate(form);
      setMessage("✅ Certificate generated and sent to email!");
      setForm(initialState);
    } catch (error) {
      setMessage("❌ Failed to generate certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="gstNumber"
        placeholder="GST Number"
        value={form.gstNumber}
        onChange={handleChange}
      />

      <input
        name="businessName"
        placeholder="Business Name"
        value={form.businessName}
        onChange={handleChange}
      />

      <textarea
        name="businessAddress"
        placeholder="Business Address"
        value={form.businessAddress}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Certificate"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "420px"
  }
};

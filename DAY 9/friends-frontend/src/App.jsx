import { useEffect, useState } from "react";

const API = "http://localhost:3000/friends";

function App() {
  const [friends, setFriends] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    birthday: "",
    city: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchFriends = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setFriends(data);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditingId(null);
    } else {
      // CREATE
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    }

    setForm({ name: "", age: "", birthday: "", city: "" });
    fetchFriends();
  };

  const handleEdit = (friend) => {
    setEditingId(friend._id);
    setForm({
      name: friend.name,
      age: friend.age,
      birthday: friend.birthday.slice(0, 10),
      city: friend.city
    });
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchFriends();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>🎉 Friends CRUD (React + Express + MongoDB)</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="birthday"
          type="date"
          value={form.birthday}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">
          {editingId ? "Update Friend" : "Add Friend"}
        </button>
      </form>

      <hr />

      <ul>
        {friends.map((f) => (
          <li key={f._id} style={{ marginBottom: 10 }}>
            <b>{f.name}</b> | {f.age} | {f.city} |{" "}
            {new Date(f.birthday).toDateString()}
            <br />
            <button onClick={() => handleEdit(f)}>Edit</button>
            <button onClick={() => handleDelete(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
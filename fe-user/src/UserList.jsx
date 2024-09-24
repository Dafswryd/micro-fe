import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3001/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDelete = async (id_user) => {
    const token = localStorage.getItem("token");

    // Tampilkan alert konfirmasi
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      try {
        // Lakukan penghapusan jika pengguna mengonfirmasi
        await axios.delete(`http://localhost:3001/user/delete/${id_user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Jika penghapusan berhasil, tampilkan toast sukses
        toast.success("User deleted successfully");

        // Update state setelah penghapusan
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id_user !== id_user)
        );
      } catch (error) {
        console.error("Error deleting user", error);

        // Tampilkan toast error jika penghapusan gagal
        toast.error("Failed to delete user");
      }
    }
  };

  // Handle editing a user (opens the form)
  const handleEdit = (user) => {
    setEditingUser(user.id_user);
    setEditData({ name: user.name, email: user.email });
  };

  // Handle updating a user (submits the form)
  const handleUpdate = async (id_user) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://localhost:3001/user/update/${id_user}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) => (user.id_user === id_user ? response.data : user))
      );
      setEditingUser(null); // Close the form after update
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  // Handle form input changes for update
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Daftar Pengguna</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Email</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_user}>
              <td className="border px-4 py-2">{user.id_user}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {editingUser === user.id_user ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingUser === user.id_user ? (
                  <>
                    <button
                      onClick={() => handleUpdate(user.id_user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => handleDelete(user.id_user)}
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    >
                      Hapus
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

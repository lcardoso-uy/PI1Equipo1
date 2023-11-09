import React from 'react'

const UsuariosAdmin = () => {
    onst [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const toggleAdminStatus = async (userId, isAdmin) => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isAdmin: !isAdmin })
        });
        if (response.ok) {
          fetchUsers();
        }
      } catch (error) {
        console.error("Error updating user admin status:", error);
      }
    };
  
    if (loading) {
      return <div>Loading users...</div>;
    }
  
    return (
      <div className="admin-users">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => toggleAdminStatus(user.id, user.isAdmin)}>
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default UsuariosAdmin
import { useState } from "react";
import UserManagement from "./components/UserManagement";
import type { AuthUser } from "./types";
import { mockAuthUsers } from "./data/mockData";
import "./index.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser>(mockAuthUsers[0]);

  return (
    <div>
      {/* User Switcher */}
      <div style={{ 
        backgroundColor: 'var(--color-navy-dark)', 
        padding: '1rem'
      }}>
        <div style={{ 
          maxWidth: '80rem', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <h2 style={{ 
            color: 'white', 
            fontWeight: 600,
            margin: 0
          }}>User Management Demo</h2>
          <div>
            <label style={{ 
              color: '#94a3b8', 
              fontSize: '0.875rem', 
              marginRight: '0.5rem' 
            }}>Logged in as:</label>
            <select
              style={{
                backgroundColor: 'var(--color-navy-light)',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                color: 'white',
                border: '1px solid #374151'
              }}
              value={currentUser.id}
              onChange={(e) =>
                setCurrentUser(mockAuthUsers.find((u) => u.id === +e.target.value)!)
              }
            >
              {mockAuthUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <UserManagement currentUser={currentUser} />
    </div>
  );
}
import React, { useRef, useState, useEffect } from 'react';

export default function Footer() {
  const fileInputRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleDownloadCv = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/download/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Cv.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the CV:');
    }
  };

  const handleUploadFile = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('File uploaded successfully:', result);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Error uploading the file.');
    }
  };

  const handleDeleteAllFiles = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete all files? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/file-cv/truncate', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('All files deleted successfully:', result);
      alert('All files deleted successfully!');
    } catch (error) {
      console.error('Error deleting files:', error);
      alert('Error deleting files.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token); // Store the token for future requests
      setIsAuthenticated(true); // Update authentication status
      alert('Login successful!');
      setIsLoginModalOpen(false); // Close the modal after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const data = await response.json();
      console.log('Logout successful:', data);
      localStorage.removeItem('token'); // Remove the token from localStorage
      setIsAuthenticated(false); // Update authentication status
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out');
    }
  };

  return (
    <footer className="p-4 absolute w-full bottom-0 z-50 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <div className="footer">
          {!isAuthenticated && (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-green-600 rounded-lg float-right ml-2 text-white shadow-md shadow-green-400 py-2 px-4"
            >
              Login
            </button>
          )}

          <button
            onClick={handleDownloadCv}
            className="bg-green-600 rounded-lg float-right ml-2 text-white shadow-md shadow-green-400 py-2 px-4"
          >
            Download CV
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleUploadFile}
          />
         {localStorage.getItem("token") && <button
            onClick={() => fileInputRef.current.click()}
            className="bg-green-600 rounded-lg float-right ml-2 text-white shadow-md shadow-green-400 py-2 px-4"
          >
            Upload
          </button>}
         {localStorage.getItem("token") && <button
            onClick={handleDeleteAllFiles}
            className="bg-green-600 rounded-lg float-right ml-2 text-white shadow-md shadow-green-400 py-2 px-4"
          >
            Delete
          </button>}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-green-600 rounded-lg float-right ml-2 text-white shadow-md shadow-green-400 py-2 px-4"
            >
              Logout
            </button>
          )}
        </div>
        <div className="flex iconsmedia gap-1 w-48 py-2">
          <img className="w-10" src="./linkedin.svg" alt="" />
          <img className="w-10" src="./facebook.svg" alt="" />
          <img className="w-10" src="./github.svg" alt="" />
          <img className="w-10" src="./gmail.svg" alt="" />
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-lg text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-lg text-black"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
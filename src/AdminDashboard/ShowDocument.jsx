import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowDocument = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await axios.get('/api/documents', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setDocuments(res.data);
            } catch (err) {
                setError('Failed to fetch documents');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/documents/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setDocuments(documents.filter(doc => doc._id !== id));
        } catch (err) {
            setError('Failed to delete document');
        }
    };

    if (loading) return <div>Loading documents...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="documents-list">
            <h2>Your Documents</h2>
            {documents.length < 0 ? (
                <p>No documents uploaded yet.</p>
            ) : (
                <div className="documents-grid">
                    {/* {documents.map(document => (
                        <div key={document._id} className="document-card">
                            <div className="document-icon">
                                <i className="fas fa-file-pdf"></i>
                            </div>
                            <div className="document-info">
                                <h3>{document.title}</h3>
                                <p>{document.description}</p>
                                <div className="document-meta">
                                    <span className="category">{document.category}</span>
                                    <span className="date">
                                        {new Date(document.uploadedAt).toLocaleDateString()}
                                    </span>
                                    <span className="size">
                                        {(document.file.size / 1024).toFixed(2)} KB
                                    </span>
                                </div>
                            </div>
                            <div className="document-actions">
                                <a
                                    href={document.file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-view"
                                >
                                    View
                                </a>
                                <button
                                    onClick={() => handleDelete(document._id)}
                                    className="btn btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))} */}
                </div>
            )}
        </div>
    );
};

export default ShowDocument;

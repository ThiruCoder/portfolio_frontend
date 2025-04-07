import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PDFManager = () => {
    const [status, setStatus] = useState({ message: '', type: '' });
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')
    const [docsData, setDocsData] = useState([])
    const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'
    const showStatus = (message, type) => {
        setStatus({ message, type });
    };

    const handlePdf = async (event) => {
        event.preventDefault();
        if (!file) {
            showStatus('Please select a PDF file', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        // upload, get, delete
        try {
            const result = await axios.post(`${backendUrl}/postpdf/uploadfpdf`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (result) {
                console.log(result.data);
            } else {
                console.log('not uploaded');

            }

            const data = await response.json();
            if (response.ok) {
                showStatus('PDF uploaded successfully!', 'success');
                // Clear the file input after successful upload
                event.target.value = '';
            } else {
                showStatus(data.message || 'Error uploading PDF', 'error');
            }
        } catch (err) {
            console.log(err.response.data.message || err.message);

            showStatus('Error uploading PDF: ' + err.message, 'error');
        }
    };

    const getPDF = async () => {
        try {
            await axios.get(`${backendUrl}/postpdf/getPdf`)
                .then((res) => setDocsData(res))
                .catch((err) => console.log(err))
        } catch (err) {
            showStatus('Error downloading PDF: ' + err.message, 'error');
        }
    };


    const deletePDF = async () => {
        try {
            await axios.delete(`${backendUrl}/postpdf/deletePdf/${docsData.data.data.map(ite => ite._id).join()}`)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err))
        } catch (err) {
            showStatus('Error deleting PDF: ' + err.message, 'error');
        }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <h1>PDF Manager</h1>

                <Box component={'form'} onSubmit={handlePdf} style={{
                    border: '1px solid #ddd',
                    padding: '20px',
                    borderRadius: '5px'
                }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flexGrow: 1, gap: 2, display: 'flex', flexDirection: 'column' }}>
                            <h2>Upload PDF</h2>
                            <input
                                type="file"
                                id="fileInput"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{
                                    marginBottom: '10px'
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                onChange={(e) => setTitle(e.target.value)}
                                label='Title' sx={{
                                    input: {
                                        border: '2px solid white',
                                        borderRadius: 2,
                                        color: 'white'
                                    },
                                    label: {
                                        color: 'white'
                                    }
                                }} />
                        </Box>
                    </Box>
                    <Button type='submit'>Submit</Button>
                    <p>Note: Only one PDF is allowed at a time.</p>
                </Box>

                <div style={{
                    border: '1px solid #ddd',
                    padding: '20px',
                    borderRadius: '5px'
                }}>
                    <h2>Actions</h2>
                    <button
                        onClick={getPDF}
                        style={{
                            padding: '10px 15px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#0056b3'}
                        onMouseOut={(e) => e.target.style.background = '#007bff'}
                    >
                        Get PDF
                    </button>
                    <button
                        onClick={deletePDF}
                        style={{
                            padding: '10px 15px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#0056b3'}
                        onMouseOut={(e) => e.target.style.background = '#007bff'}
                    >
                        Delete PDF
                    </button>
                </div>

                <div id="status" style={{
                    marginTop: '20px',
                    color: status.type === 'error' ? 'red' : 'green'
                }}>
                    {status.message}
                </div>
            </div>
        </div>
    );
};

export default PDFManager;


// export function PDFPreview() {
//     const [pdfData, setPdfData] = useState(null);
//     const pdfId = '67f0e305cb084c28bf62f2a5'
//     useEffect(() => {
//         const fetchPreview = async () => {
//             const response = await axios.get(`https://porfolio-backend-spbi.onrender.com/postpdf/preview/${pdfId}`)
//             setPdfData(response);
//         };

//         fetchPreview();
//     }, [pdfId]);
//     console.log(pdfData);

//     return (
//         <div className="pdf-preview">
//             {/* {pdfData ? (
//                 <>
//                     <h2>{pdfData.title}</h2>
//                     <div className="page-thumbnails">
//                         {pdfData.pages.map(page => (
//                             <div key={page.number} className="page-thumbnail">
//                                 <img
//                                     src={page.thumbnail}
//                                     alt={`Page ${page.number}`}
//                                     onClick={() => window.open(page.fullPage, '_blank')}
//                                 />
//                                 <span>Page {page.number}</span>
//                             </div>
//                         ))}
//                     </div>
//                     <a href={pdfData.downloadUrl} download>Download PDF</a>
//                 </>
//             ) : (
//                 <p>Loading preview...</p>
//             )} */}
//         </div>
//     );
// }
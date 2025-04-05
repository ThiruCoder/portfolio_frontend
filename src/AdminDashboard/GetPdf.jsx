import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function PDFPreview() {
    const [pdfData, setPdfData] = useState(null);
    const pdfId = '67f0e305cb084c28bf62f2a5'
    useEffect(() => {
        const fetchPreview = async () => {
            const response = await axios.get(`http://localhost:5000/postpdf/preview/${pdfId}`)
            setPdfData(response);
        };

        fetchPreview();
    }, [pdfId]);
    console.log(pdfData);

    return (
        <div className="pdf-preview">
            {/* {pdfData ? (
                <>
                    <h2>{pdfData.title}</h2>
                    <div className="page-thumbnails">
                        {pdfData.pages.map(page => (
                            <div key={page.number} className="page-thumbnail">
                                <img
                                    src={page.thumbnail}
                                    alt={`Page ${page.number}`}
                                    onClick={() => window.open(page.fullPage, '_blank')}
                                />
                                <span>Page {page.number}</span>
                            </div>
                        ))}
                    </div>
                    <a href={pdfData.downloadUrl} download>Download PDF</a>
                </>
            ) : (
                <p>Loading preview...</p>
            )} */}
        </div>
    );
}

// const PDFManager = () => {
//     const [status, setStatus] = useState({ message: '', type: '' });
//     const API_URL = 'http://localhost:5000/postpdf';

//     const showStatus = (message, type) => {
//         setStatus({ message, type });
//     };

//     const uploadPDF = async (event) => {
//         const fileInput = event.target.files[0];
//         if (!fileInput) {
//             showStatus('Please select a PDF file', 'error');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('pdf', fileInput);
//         // upload, get, delete
//         try {
//             const response = await fetch(`${API_URL}/upload`, {
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 showStatus('PDF uploaded successfully!', 'success');
//                 // Clear the file input after successful upload
//                 event.target.value = '';
//             } else {
//                 showStatus(data.message || 'Error uploading PDF', 'error');
//             }
//         } catch (err) {
//             showStatus('Error uploading PDF: ' + err.message, 'error');
//         }
//     };

//     const getPDF = async () => {
//         try {
//             const response = await fetch(`${API_URL}/get`);
//             if (response.ok) {
//                 // Trigger download
//                 const blob = await response.blob();
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'downloaded.pdf';
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 window.URL.revokeObjectURL(url);
//                 showStatus('PDF downloaded successfully!', 'success');
//             } else {
//                 const data = await response.json();
//                 showStatus(data.message || 'Error downloading PDF', 'error');
//             }
//         } catch (err) {
//             showStatus('Error downloading PDF: ' + err.message, 'error');
//         }
//     };

//     const deletePDF = async () => {
//         try {
//             const response = await fetch(`${API_URL}/delete`, {
//                 method: 'DELETE'
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 showStatus('PDF deleted successfully!', 'success');
//             } else {
//                 showStatus(data.message || 'Error deleting PDF', 'error');
//             }
//         } catch (err) {
//             showStatus('Error deleting PDF: ' + err.message, 'error');
//         }
//     };

//     return (
//         <div style={{
//             fontFamily: 'Arial, sans-serif',
//             maxWidth: '600px',
//             margin: '0 auto',
//             padding: '20px'
//         }}>
//             <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '20px'
//             }}>
//                 <h1>PDF Manager</h1>

//                 <div style={{
//                     border: '1px solid #ddd',
//                     padding: '20px',
//                     borderRadius: '5px'
//                 }}>
//                     <h2>Upload PDF</h2>
//                     <input
//                         type="file"
//                         id="fileInput"
//                         accept=".pdf"
//                         onChange={uploadPDF}
//                         style={{ marginBottom: '10px' }}
//                     />
//                     <p>Note: Only one PDF is allowed at a time.</p>
//                 </div>

//                 <div style={{
//                     border: '1px solid #ddd',
//                     padding: '20px',
//                     borderRadius: '5px'
//                 }}>
//                     <h2>Actions</h2>
//                     <button
//                         onClick={getPDF}
//                         style={{
//                             padding: '10px 15px',
//                             background: '#007bff',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer',
//                             marginRight: '10px'
//                         }}
//                         onMouseOver={(e) => e.target.style.background = '#0056b3'}
//                         onMouseOut={(e) => e.target.style.background = '#007bff'}
//                     >
//                         Get PDF
//                     </button>
//                     <button
//                         onClick={deletePDF}
//                         style={{
//                             padding: '10px 15px',
//                             background: '#007bff',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '5px',
//                             cursor: 'pointer'
//                         }}
//                         onMouseOver={(e) => e.target.style.background = '#0056b3'}
//                         onMouseOut={(e) => e.target.style.background = '#007bff'}
//                     >
//                         Delete PDF
//                     </button>
//                 </div>

//                 <div id="status" style={{
//                     marginTop: '20px',
//                     color: status.type === 'error' ? 'red' : 'green'
//                 }}>
//                     {status.message}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PDFManager;
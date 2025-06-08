// pages/resume.js
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox, Divider, Chip, Stack, Tooltip, IconButton } from '@mui/material';
import { Edit, Download, FileText, ListFilterPlus, X } from 'lucide-react';
import Card from '../UI/Card';
import ResumeForm from '../UI/ResumeForm';
import { fontOptions, templateColors } from '../UI/skillTags';
import { apiIntance } from '../../middlewares/Url_GlobalErrorHandler';
import { useGlobalContext } from '../../GlobalContext/context';
import html2pdf from 'html2pdf.js';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// const projects = [
//     {
//         id: 'p1',
//         title: 'E-Commerce Dashboard',
//         description: 'A complete admin dashboard for online store management with sales analytics and inventory tracking.',
//         thumbnail: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//         techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
//         status: 'completed',
//         github: 'https://github.com/user/ecommerce-dashboard',
//         demo: 'https://ecommerce-dashboard.example.com',
//         created: '2023-05-15',
//         updated: '2023-09-20'
//     },
//     {
//         id: 'p2',
//         title: 'Personal Finance Tracker',
//         description: 'Mobile-first web app to track personal expenses, set budgets, and visualize spending habits.',
//         thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//         techStack: ['Vue.js', 'Firebase', 'Chart.js', 'Sass'],
//         status: 'in-progress',
//         github: 'https://github.com/user/finance-tracker',
//         created: '2023-07-10',
//         updated: '2023-10-05'
//     },
//     {
//         id: 'p3',
//         title: 'AI Image Generator',
//         description: 'Web application that leverages machine learning to create unique images from text descriptions.',
//         thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//         techStack: ['Next.js', 'Python', 'TensorFlow', 'AWS'],
//         status: 'completed',
//         github: 'https://github.com/user/ai-image-generator',
//         demo: 'https://ai-image-gen.example.com',
//         created: '2023-02-20',
//         updated: '2023-06-18'
//     },
//     {
//         id: 'p4',
//         title: 'Task Management System',
//         description: 'Collaborative task manager with real-time updates, team assignments, and progress tracking.',
//         thumbnail: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//         techStack: ['Angular', 'Express', 'PostgreSQL', 'Socket.io'],
//         status: 'in-progress',
//         github: 'https://github.com/user/task-management',
//         created: '2023-08-05',
//         updated: '2023-10-12'
//     },
//     {
//         id: 'p5',
//         title: 'Weather Dashboard',
//         description: 'Interactive weather forecast application with location-based data and historical trends.',
//         thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//         techStack: ['React', 'Redux', 'OpenWeather API', 'Styled Components'],
//         status: 'completed',
//         github: 'https://github.com/user/weather-app',
//         demo: 'https://weather-app.example.com',
//         created: '2023-04-12',
//         updated: '2023-08-30'
//     },
//     {
//         id: 'p6',
//         title: 'Social Media Analytics',
//         description: 'Dashboard to track and analyze social media performance across multiple platforms.',
//         thumbnail: 'https://images.pexels.com/photos/4125670/pexels-photo-4125670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//         techStack: ['Next.js', 'GraphQL', 'MongoDB', 'D3.js'],
//         status: 'planned',
//         github: 'https://github.com/user/social-analytics',
//         created: '2023-09-28',
//         updated: '2023-10-01'
//     }
// ];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Resume = ({ top, open, setOpen, projects, crud }) => {
    const [updatedId, setUpdatedId] = useState(null);
    // const [resumeData, setResumeData] = useState([]);
    const [colors, setColors] = useState(null);
    const [fontFamily, setFontFamily] = useState(null);
    const [personalInfo, setPersonalInfo] = useState(true);
    const [summer, setSummery] = useState(true);
    const [educate, setEducate] = useState(true);
    const [experience, setExperience] = useState(true);
    const [skill, setSkill] = useState(true);
    const [project, setProject] = useState(true);
    const [template, setTemplate] = useState('Classic');
    const [frontend, setFrontend] = useState([]);
    const [backend, setBackend] = useState([]);
    const [database, setDatabase] = useState([]);
    const [other, setOther] = useState([]);
    const [tool, setTool] = useState([]);
    const [state, setState] = React.useState({ top: false });

    const { resumeData, setResumeData, refresh, setRefresh } = useGlobalContext();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleResumeData = async () => {
        try {
            await apiIntance.get('/resume/getResume')
                .then((response) => {
                    setResumeData(response?.data?.data);
                })
                .catch((error) => {
                    console.error('Error fetching resume data:', error);
                });
        } catch (error) {
            console.error('Error fetching resume data:', error);
        }
    }


    useEffect(() => {
        handleResumeData();
    }, [refresh])

    useEffect(() => {

        const front = [];
        const back = [];
        const db = [];
        const misc = [];
        const util = [];

        resumeData.map(data => {
            data.skills.forEach(skill => {
                switch (skill.category) {
                    case 'Frontend':
                        front.push(skill);
                        break;
                    case 'Backend':
                        back.push(skill);
                        break;
                    case 'Database':
                        db.push(skill);
                        break;
                    case 'Other':
                        misc.push(skill);
                        break;
                    case 'Tools':
                        util.push(skill);
                        break;
                }
            });
        })

        setFrontend(front);
        setBackend(back);
        setDatabase(db);
        setOther(misc);
        setTool(util);

    }, [resumeData]);


    // const skiller = ['React', 'Nextjs']

    const generatePDF = () => {
        if (typeof window !== 'undefined') {
            const element = document.getElementById('pdf-content');
            if (element) {
                html2pdf()
                    .set({
                        margin: 0.5,
                        filename: 'resume.pdf',
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                    })
                    .from(element)
                    .save();
            }
        }
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <Card>
                <Box p={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                        <Typography variant="h6" fontWeight={600} mb={2}>Resume Settings</Typography>
                        <IconButton sx={{ position: 'relative', bottom: 8 }} onClick={toggleDrawer(anchor, false)}>
                            <X />
                        </IconButton>
                    </Box>

                    {['Classic', 'Primary Color', 'Font'].map((label, idx) => (
                        <FormControl fullWidth margin="normal" key={`${label}-${idx}`}>
                            <InputLabel>{label}</InputLabel>
                            <Select defaultValue="" label={label}>
                                {/* , 'Minimal', 'Creative' */}
                                {label === 'Classic' && ['Classic', 'Modern'].map(option => (
                                    <MenuItem key={option} onClick={() => setTemplate(option)} value={option}>{option}</MenuItem>
                                ))}
                                {label === 'Primary Color' && templateColors.map(option => (
                                    <MenuItem key={option} onClick={() => setColors(option?.hex)} value={option?.hex}>{option.name}</MenuItem>
                                ))}
                                {label === 'Font' &&
                                    Object.keys(fontOptions).map((option) => (
                                        <MenuItem
                                            key={option}
                                            value={fontOptions[option]}
                                            onClick={() => setFontFamily(fontOptions[option])}
                                            style={{ fontFamily: fontOptions[option] }} // Optional preview
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}

                            </Select>
                        </FormControl>
                    ))}

                    <Box mt={2}>
                        <Typography variant="subtitle1" fontWeight={500}>Sections to Include</Typography>
                        {['Personal Information', 'Professional Summary', 'Work Experience', 'Education', 'Skills', 'Projects'].map((section, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={<Checkbox defaultChecked color="primary" />}
                                label={section}
                                checked={section === 'Personal Information' ? personalInfo : section === 'Professional Summary' ? summer : section === 'Work Experience' ? experience : section === 'Education' ? educate : section === 'Skills' ? skill : project}
                                onClick={() => {
                                    if (section === 'Personal Information') {
                                        setPersonalInfo(!personalInfo);
                                    }
                                    if (section === 'Professional Summary') {
                                        setSummery(!summer);
                                    }
                                    if (section === 'Work Experience') {
                                        setExperience(!experience);
                                    }
                                    if (section === 'Education') {
                                        setEducate(!educate);
                                    }
                                    if (section === 'Skills') {
                                        setSkill(!skill);
                                    }
                                    if (section === 'Projects') {
                                        setProject(!project);
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="subtitle1" fontWeight={500} mb={1}>Export Options</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {['PDF'].map((type, i) => (
                            <Button key={`${type}-${i}`} onClick={() => {
                                if (type === 'PDF') {
                                    generatePDF();
                                }
                            }} variant="outlined" size="small" startIcon={<FileText size={16} />}>{type}</Button>
                        ))}
                    </Stack>
                </Box>
            </Card>
        </Box>
    );


    // const generateDocx = async () => {
    //   const doc = new Document({
    //     sections: [{
    //       children: [
    //         new Paragraph({
    //           children: [new TextRun("Fullstack Developer Resume")],
    //         }),
    //       ],
    //     }],
    //   });

    //   const blob = await Packer.toBlob(doc);
    //   saveAs(blob, "resume.docx");
    // };

    // const downloadHTML = () => {
    //   const htmlContent = `
    //     <html>
    //       <head><title>Resume</title></head>
    //       <body><h1>Fullstack Developer Resume</h1></body>
    //     </html>
    //   `;
    //   const blob = new Blob([htmlContent], { type: 'text/html' });
    //   const url = URL.createObjectURL(blob);

    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'resume.html';
    //   a.click();
    //   URL.revokeObjectURL(url);
    // };

    return (
        <Box sx={{ px: 3, py: 3, pt: 12 }}>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                gap={2}
                mb={4}
            >
                <Typography variant="h5" fontWeight={600} color='textPrimary'>{crud === 'visible' ? 'Resume Builder' : 'Resume Overview'}</Typography>
                <Stack direction="row" spacing={2}>
                    {crud === 'visible' && <Button variant="outlined" onClick={() => {
                        setUpdatedId(resumeData[0]?._id)
                        handleOpen();
                    }} startIcon={<Edit size={18} />}>Edit</Button>}
                    {crud === 'visible' && <Button variant="outlined" onClick={handleOpen} startIcon={<Edit size={18} />}>Create</Button>}
                    <div>
                        <React.Fragment key={'top'}>
                            <Button onClick={toggleDrawer('top', true)} sx={{ display: { xs: 'flex', lg: 'none' } }} startIcon={<ListFilterPlus />} variant='outlined'>Filter</Button>
                            <Drawer
                                anchor={'top'}
                                open={state['top']}
                                onClose={toggleDrawer('top', false)}
                            >
                                {list('top')}
                            </Drawer>
                        </React.Fragment>
                    </div>
                    <Button variant="contained" onClick={generatePDF} startIcon={<Download size={18} />}>Download</Button>
                </Stack>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={4} sx={{ color: 'textPrimary', display: { xs: 'none', lg: 'flex' } }}>
                    <Card>
                        <Box p={3}>
                            <Typography variant="h6" fontWeight={600} mb={2}>Resume Settings</Typography>

                            {['Classic', 'Primary Color', 'Font'].map((label, idx) => (
                                <FormControl fullWidth margin="normal" key={`${label}-${idx}`}>
                                    <InputLabel>{label}</InputLabel>
                                    <Select defaultValue="" label={label}>
                                        {/* , 'Minimal', 'Creative' */}
                                        {label === 'Classic' && ['Classic', 'Modern'].map(option => (
                                            <MenuItem key={option} onClick={() => setTemplate(option)} value={option}>{option}</MenuItem>
                                        ))}
                                        {label === 'Primary Color' && templateColors.map(option => (
                                            <MenuItem key={option} onClick={() => setColors(option?.hex)} value={option?.hex}>{option.name}</MenuItem>
                                        ))}
                                        {label === 'Font' &&
                                            Object.keys(fontOptions).map((option) => (
                                                <MenuItem
                                                    key={option}
                                                    value={fontOptions[option]}
                                                    onClick={() => setFontFamily(fontOptions[option])}
                                                    style={{ fontFamily: fontOptions[option] }} // Optional preview
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}

                                    </Select>
                                </FormControl>
                            ))}

                            <Box mt={2}>
                                <Typography variant="subtitle1" fontWeight={500}>Sections to Include</Typography>
                                {['Personal Information', 'Professional Summary', 'Work Experience', 'Education', 'Skills', 'Projects'].map((section, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        control={<Checkbox defaultChecked color="primary" />}
                                        label={section}
                                        checked={section === 'Personal Information' ? personalInfo : section === 'Professional Summary' ? summer : section === 'Work Experience' ? experience : section === 'Education' ? educate : section === 'Skills' ? skill : project}
                                        onClick={() => {
                                            if (section === 'Personal Information') {
                                                setPersonalInfo(!personalInfo);
                                            }
                                            if (section === 'Professional Summary') {
                                                setSummery(!summer);
                                            }
                                            if (section === 'Work Experience') {
                                                setExperience(!experience);
                                            }
                                            if (section === 'Education') {
                                                setEducate(!educate);
                                            }
                                            if (section === 'Skills') {
                                                setSkill(!skill);
                                            }
                                            if (section === 'Projects') {
                                                setProject(!project);
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="subtitle1" fontWeight={500} mb={1}>Export Options</Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {['PDF'].map((type, i) => (
                                    <Button key={`${type}-${i}`} onClick={() => {
                                        if (type === 'PDF') {
                                            generatePDF();
                                        }
                                    }} variant="outlined" size="small" startIcon={<FileText size={16} />}>{type}</Button>
                                ))}
                            </Stack>
                        </Box>
                    </Card>

                </Grid>

                <Grid item xs={12} lg={8} sx={{ color: 'textPrimary' }}>
                    {resumeData.length > 0 ?
                        <div id="pdf-content">
                            <Card>
                                <Box p={4}>
                                    {resumeData && resumeData.length > 0 ? resumeData?.map(({ personalData }, index) => (
                                        <Box key={`${personalData?.lname}-${index}`} sx={{ display: personalInfo ? 'block' : 'none', }} borderColor="divider" pb={3}>
                                            <Typography variant="h5" fontFamily={fontFamily || 'inherit'} color={colors || 'primary'}
                                                sx={{ textAlign: template === 'Modern' && 'center', }}
                                                fontWeight={700}>{`${personalData?.fname} ${personalData?.lname}`}</Typography>
                                            <Typography variant="subtitle1" fontFamily={fontFamily || 'inherit'}
                                                sx={{
                                                    textAlign: template === 'Modern' && 'center',
                                                    fontWeight: template === 'Modern' && 600
                                                }}
                                                color={colors || 'primary'} >{personalData?.role}</Typography>
                                            <Stack direction="column" mt={1} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: template === 'Modern' && 'center', flexDirection: template === 'Modern' && 'row' }}>
                                                <Typography variant="body2" sx={{ pr: 0.6 }} fontFamily={fontFamily || 'inherit'} color={'textPrimary'} ><span style={{ display: template === 'Modern' && 'none', }}>Email:</span> {personalData?.email}</Typography>
                                                <Typography variant="body2" sx={{ pr: 0.6 }} fontFamily={fontFamily || 'inherit'} color={'textPrimary'} ><span >{template === 'Modern' ? ' | ' : 'Mobile: '}</span> {personalData?.number}</Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.6 }}>
                                                    <Typography color={'textPrimary'} fontSize={14}>{template === 'Modern' ? '  | ' : 'Address: '}</Typography>
                                                    <Typography variant="body2" fontFamily={fontFamily || 'inherit'} color={'textPrimary'}  >{personalData?.address?.city}</Typography>
                                                    <Typography variant="body2" fontFamily={fontFamily || 'inherit'} color={'textPrimary'}  >{personalData?.address?.state}</Typography>
                                                    <Typography variant="body2" fontFamily={fontFamily || 'inherit'} color={'textPrimary'}  >{personalData?.address?.country}</Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    )) : null}
                                    {/* Summery */}
                                    {resumeData && resumeData.length > 0 ? resumeData?.map(({ summary }, index) => (
                                        <Box display={summer ? 'block' : 'none'} mb={4} key={`summery-${index}`}  >
                                            <Divider sx={{ mb: 2 }} />
                                            <Typography variant="h6" sx={{ textAlign: template === 'Modern' && 'center', }} color={colors || 'primary'} fontFamily={fontFamily || 'inherit'} fontWeight={600} mb={1}>Professional Summary</Typography>
                                            <Typography variant="body2" sx={{ textAlign: template === 'Modern' && 'center', }} fontFamily={fontFamily || 'inherit'} color={'textPrimary'}  >
                                                {summary}
                                            </Typography>
                                        </Box>
                                    )) : null}

                                    {/* Experience */}
                                    <Box display={experience ? 'block' : 'none'} mb={4} mt={2}>
                                        <Divider sx={{ mb: 4 }} />
                                        <Typography variant="h6" sx={{ textAlign: template === 'Modern' && 'center', }} fontFamily={fontFamily || 'inherit'} color={colors || 'primary'} fontWeight={600} mb={1}>Work Experience</Typography>
                                        {resumeData && resumeData.length > 0 ? resumeData.map(({ experience }, idx) => (
                                            <Box key={`${experience?.jobType}-${idx}`} mb={3}>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography fontFamily={fontFamily || 'inherit'} fontWeight={600} color='textPrimary'>{experience?.jobType}</Typography>
                                                    <Typography fontFamily={fontFamily || 'inherit'} variant="body2" color='textPrimary'>{experience?.joinDate.split('T')[0].split('-')[0]} - {experience?.lastDate.split('T')[0].split('-')[0]}</Typography>
                                                </Stack>
                                                <Typography fontFamily={fontFamily || 'inherit'} color='textPrimary' fontWeight={500}>{experience?.company}</Typography>
                                                <>
                                                    {experience?.performance.map((point, i) => (
                                                        <Typography fontFamily={fontFamily || 'inherit'} variant="body2" key={`${point}-${i}`} color="text.secondary">• {point}</Typography>
                                                    ))}
                                                </>
                                                {/* <ul>
                                            {job.duties.map((duty, i) => (
                                                <li key={`${duty}-${i}`}><Typography variant="body2">{duty}</Typography></li>
                                            ))}
                                        </ul> */}
                                            </Box>
                                        )) : null}
                                    </Box>

                                    {/* Education */}
                                    {resumeData && resumeData.length > 0 ? resumeData?.map(({ education }, index) => (
                                        <>
                                            {template === 'Modern'
                                                ? (
                                                    <Box display={educate ? 'block' : 'none'} >
                                                        <Divider sx={{ mb: 4 }} />
                                                        <Typography fontFamily={fontFamily || 'inherit'} variant="h6" color={colors || 'primary'} textAlign={'center'} fontWeight={600} mb={1}>Education</Typography>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} fontWeight={500} textAlign={'center'} variant="body2">{education?.ug?.course}</Typography>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} fontWeight={500} textAlign={'center'} variant="body2">{education?.ug?.college}, {education?.ug?.university} | {`${education?.ug?.start.split('T')[0].split('-')[0]} - ${education?.ug?.end.split('T')[0].split('-')[0]}`} | 84.9%</Typography>
                                                        {/* Bachelor of Science (B.Sc.) – Mathematics & Science  
Nalanda Degree College, Mahatma Gandhi University | 2018 – 2022 | 84.9% */}
                                                    </Box>
                                                ) : (
                                                    <Box mb={4} key={`${education?.ug?.course}-${index}`} display={educate ? 'block' : 'none'} >
                                                        <Divider sx={{ mb: 4 }} />
                                                        <Typography fontFamily={fontFamily || 'inherit'} variant="h6" color={colors || 'primary'} fontWeight={600} mb={1}>Education</Typography>
                                                        <Stack direction="row" justifyContent="space-between">
                                                            <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} fontWeight={600}>{education?.ug?.university}</Typography>
                                                            <Typography fontFamily={fontFamily || 'inherit'} variant="body2" color="textPrimary">{`${education?.ug?.start.split('T')[0].split('-')[0]} - ${education?.ug?.end.split('T')[0].split('-')[0]}`}</Typography>
                                                        </Stack>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">{education?.ug?.course}</Typography>
                                                        <Typography fontFamily={fontFamily || 'inherit'} variant="h6" fontWeight={600}>{education?.ug?.college}</Typography>

                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2"><span style={{ fontWeight: 600 }}>Grade: </span>84.9%</Typography>
                                                    </Box>
                                                )}
                                        </>
                                    )) : null}

                                    {/* Skills */}
                                    <Box my={4} display={skill ? 'block' : 'none'} >
                                        <Divider sx={{ mb: 4 }} />
                                        <Typography fontFamily={fontFamily || 'inherit'} variant="h6" color={colors || 'primary'} textAlign={template === 'Modern' && 'center'} fontWeight={600} mb={1}>Skills</Typography>
                                        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 2 }}>
                                            <Grid item xs={3} md={2} sx={template === 'Modern' && { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography sx={{ fontWeight: 600, mb: 1 }}>Frontend</Typography>
                                                {frontend?.map((skill, index) => (
                                                    <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                                            {skill.name}
                                                        </Typography>

                                                    </Box>
                                                ))}
                                            </Grid>
                                            <Grid item xs={3} md={2} sx={template === 'Modern' && { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography sx={{ fontWeight: 600, mb: 1 }}>Backend</Typography>
                                                {backend?.map((skill, index) => (
                                                    <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                                            {skill.name}
                                                        </Typography>

                                                    </Box>
                                                ))}
                                            </Grid>
                                            <Grid item xs={3} md={2} sx={template === 'Modern' && { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography sx={{ fontWeight: 600, mb: 1 }}>Database</Typography>
                                                {database?.map((skill, index) => (
                                                    <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                                            {skill.name}
                                                        </Typography>

                                                    </Box>
                                                ))}
                                            </Grid>
                                            <Grid item xs={3} md={2} sx={template === 'Modern' && { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography sx={{ fontWeight: 600, mb: 1 }}>Other</Typography>
                                                {other?.map((skill, index) => (
                                                    <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                                            {skill.name}
                                                        </Typography>

                                                    </Box>
                                                ))}
                                            </Grid>
                                            <Grid item xs={3} md={2} sx={template === 'Modern' && { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography sx={{ fontWeight: 600, mb: 1 }}>Tools/Libraries</Typography>
                                                {tool?.map((skill, index) => (
                                                    <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                                            {skill.name}
                                                        </Typography>

                                                    </Box>
                                                ))}
                                            </Grid>
                                            {/* // } else if (skill?.category === 'Backend') {
                                            //     return (
                                            //         <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                            //             <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                            //                 <strong>{skill.name}</strong>
                                            //             </Typography>
                                            //         </Box>
                                            //     )
                                            // } else if (skill?.category === 'Database') {
                                            //     return (
                                            //         <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                            //             <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                            //                 <strong>{skill.name}</strong>
                                            //             </Typography>
                                            //         </Box>
                                            //     )
                                            // } else if (skill?.category === 'Other') {
                                            //     return (
                                            //         <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                            //             <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                            //                 <strong>{skill.name}</strong>
                                            //             </Typography>
                                            //         </Box>
                                            //     )
                                            // } else if (skill?.category === 'Tools') {
                                            //     return (
                                            //         <Box item xs={2} key={`${skill.name}-${index}`} sx={{ display: 'flex', justifyContent: template === 'Modern' && 'center', alignItems: 'center' }}>
                                            //             <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2">
                                            //                 <strong>{skill.name}</strong>
                                            //             </Typography>
                                            //         </Box>
                                            //     )
                                            // } */}

                                        </Grid>
                                    </Box>
                                    {/* Projects */}
                                    <Box display={project ? 'block' : 'none'} >
                                        <Divider sx={{ mb: 4 }} />
                                        <Typography fontFamily={fontFamily || 'inherit'} sx={{ textAlign: template === 'Modern' && 'center' }} variant="h6" color={colors || 'primary'} fontWeight={600} mb={1}>Projects</Typography>
                                        <Box>
                                            {projects && projects.length > 0 ? projects.slice(0, 3).map((project, index) => (
                                                <Box key={`${project?.name}-${index}`} mb={2}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} fontWeight={600}>{project?.title}</Typography>
                                                        {/* <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} fontSize={12}>{project?.updatedAt.split('T')[0] || 0}</Typography> */}
                                                    </Box>
                                                    <Typography fontFamily={fontFamily || 'inherit'} color={'textPrimary'} variant="body2" mb={0.5}>{project?.description}</Typography>
                                                    <Typography fontFamily={fontFamily || 'inherit'} variant="body2" color="text.secondary" mb={0.5}>Status: {project?.status}</Typography>
                                                    <Typography fontFamily={fontFamily || 'inherit'} variant="body2" color="text.secondary" mb={0.5}>Created: {project?.priority}</Typography>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                                        {project.tags.map((tech, i) => (
                                                            <Box key={`${tech}-${i}`} sx={{ p: 0.4 }}>
                                                                <Chip sx={{ fontFamily: fontFamily || 'inherit' }} color={'textPrimary'} label={tech} size="small" />
                                                            </Box>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            )) : null}
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                            {
                                resumeData.length < 0 && <Typography component={'h2'}>No data found</Typography>
                            }
                        </div>
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative', bottom: 24 }}>
                            <strong>No resume data Found</strong>
                        </Box>
                    }
                </Grid>
            </Grid>
            <ResumeForm
                open={open}
                handleClose={handleClose}
                style={style}
                setRefresh={setRefresh}
                updatedId={updatedId}
                setUpdatedId={setUpdatedId}
                setOpen={setOpen}
                recentDataId={resumeData?._id}
            />
        </Box>
    );
};

export default Resume;

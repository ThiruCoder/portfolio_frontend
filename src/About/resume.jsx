import React from 'react';
import {
    Box,
    Typography,
    Divider,
    Link,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Paper,
    useTheme
} from '@mui/material';
import {
    Circle as CircleIcon,
    Square as SquareIcon,
    Adjust as AdjustIcon
} from '@mui/icons-material';

const Resume = () => {
    const theme = useTheme();

    const bulletIcons = {
        0: <CircleIcon sx={{ fontSize: '8px', mx: 1 }} />,
        1: <AdjustIcon sx={{ fontSize: '8px', mx: 1 }} />,
        2: <SquareIcon sx={{ fontSize: '8px', mx: 1 }} />,
    };

    const renderListItem = (text, index) => (
        <ListItem sx={{ py: 0, pl: 0 }}>
            <ListItemIcon sx={{ minWidth: '24px' }}>
                {bulletIcons[index % 3]}
            </ListItemIcon>
            <ListItemText
                primary={<Typography variant="body2">{text}</Typography>}
                sx={{ my: 0 }}
            />
        </ListItem>
    );

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: '900px', mx: 'auto', my: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    Charipalli Thirumalesh
                </Typography>
                <Typography variant="body1">
                    Hyderabad, Telangana |
                    <Link href="mailto:thiruthedeveloper@gmail.com" sx={{ ml: 1 }}>thiruthedeveloper@gmail.com</Link> |
                    +91 7569583293
                </Typography>
                <Typography variant="body1">
                    <Link href="http://www.linkedin.com/in/thirumalesh-charipalli-a7a127350" target="_blank">
                        LinkedIn
                    </Link> |
                    <Link href="https://github.com/ThiruCoder" target="_blank" sx={{ ml: 1 }}>
                        GitHub
                    </Link> |
                    <Link href="https://portfolio-frontend-92nm.onrender.com" target="_blank" sx={{ ml: 1 }}>
                        Portfolio
                    </Link>
                </Typography>
            </Box>

            {/* Skills */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    SKILLS
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Frontend Development:</Typography>
                        <Typography variant="body2">React.js, JavaScript (ES6+), HTML5, CSS3</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Backend Development:</Typography>
                        <Typography variant="body2">Node.js, Express.js</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Database:</Typography>
                        <Typography variant="body2">MongoDB, MySQL</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Version Control:</Typography>
                        <Typography variant="body2">Git, GitHub</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Responsive Design:</Typography>
                        <Typography variant="body2">Mobile-first approach, Flexbox, CSS Grid</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Tools & Libraries:</Typography>
                        <Typography variant="body2">Webpack, Babel, NPM, Axios, Redux, JWT</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">APIs:</Typography>
                        <Typography variant="body2">RESTful API integration, working with JSON, asynchronous calls</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Work Experience */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    WORK EXPERIENCE
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Typography variant="h6" fontWeight="bold">Frontend Developer | 2+ Years of Experience</Typography>
                    <Typography variant="body2">April 2023 - March 2025</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>GygaByte infocomm pvt ltd | Hyderabad, Telangana</Typography>

                <List dense>
                    {[
                        "Developed and optimized high-performance, user-centric web applications using React, Redux, and modern frontend ecosystems.",
                        "Collaborated with cross-functional teams (UX, backend, QA) to deliver scalable solutions with a focus on animations (GSAP/Framer Motion), state management, and security (JWT).",
                        "Led initiatives to enhance UI interactivity and reduce latency, improving user engagement metrics by 25%+.",
                        "Mentored junior developers in best practices (custom hooks, component reusability, testing).",
                        "Architected modular frontend components with reusable logic, boosting development speed and maintainability across projects.",
                        "Integrated real-time features using Firebase and WebSockets, enhancing user experience and data sync efficiency."
                    ].map((item, index) => renderListItem(item, index))}
                </List>
            </Box>

            {/* Projects */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    PROJECTS
                </Typography>
                <Divider sx={{ my: 1 }} />

                {/* Project 1 */}
                <Typography variant="h6" fontWeight="bold">1. Portfolio Interactive (Node.js, Express, MongoDB, React, Redux)</Typography>
                <List dense>
                    {[
                        "Innovative Full-Stack Developer with a passion for building dynamic, high-performance web applications. My portfolio showcases expertise in modern technologies like React.js, Node.js, Express.js, and MongoDB, delivering seamless user experiences with smooth animations powered by GSAP and Framer Motion.",
                        "I specialize in crafting responsive, interactive UIs with Material-UI, efficient state management using Redux & custom Hooks, and secure authentication via JWT & Bcrypt.js. My projects highlight strong backend skills (RESTful APIs, database design) and frontend creativity (animations, transitions, and intuitive design)."
                    ].map((item, index) => renderListItem(item, index))}
                </List>

                {/* Project 2 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>2. Enterprise Admin Dashboard (React, Redux, Material-UI, Framer Motion)</Typography>
                <List dense>
                    {[
                        "Led the development of a scalable admin dashboard for internal operations, improving workflow efficiency by 40%.",
                        "Implemented real-time data visualization with interactive charts (Chart.js) and customizable widgets.",
                        "Enhanced UX with Framer Motion animations, dark/light mode toggle, and role-based access control (JWT).",
                        "Tech: React, Redux Toolkit, Material-UI, REST APIs, JWT.",
                        "Impact: Reduced manual reporting time by 30% for cross-functional teams."
                    ].map((item, index) => renderListItem(item, index))}
                </List>

                {/* Project 3 */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>3. E-Commerce Platform Revamp (React, GSAP, Redux, Responsive UI)</Typography>
                <List dense>
                    {[
                        "Redesigned the company's flagship e-commerce frontend, achieving a 95% mobile responsiveness score (Lighthouse).",
                        "Integrated GSAP animations for product galleries and cart interactions, boosting user engagement by 25%.",
                        "Optimized performance using React.memo, lazy loading, and Redux state caching.",
                        "Tech: React, GSAP, Redux, Axios, Material-UI.",
                        "Impact: Increased conversion rates by 18% post-launch."
                    ].map((item, index) => renderListItem(item, index))}
                </List>
            </Box>

            {/* Education */}
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    EDUCATION
                </Typography>
                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Typography variant="h6" fontWeight="bold">Bachelor of Science (MPC)</Typography>
                    <Typography variant="body2">July 2018 - May 2022</Typography>
                </Box>
                <Typography variant="subtitle1">Nalanda Degree College, Choutuppal</Typography>
                <Typography variant="body2">CGPA: 8.49 / 10</Typography>
                <Typography variant="body2">Secured top 4% rank in academic performance. Grade: A+</Typography>
            </Box>
        </Paper>
    );
};

export default Resume;
import React from 'react';
import { motion } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Typography, Card, CardContent } from '@mui/material';
import { Work, School } from '@mui/icons-material';

const experiences = [
    {
        title: "Frontend Developer",
        company: "GigaByte Infocomm Pvt Ltd",
        period: "2023 - Present",
        description: "Led development of enterprise applications using React and Redux",
        icon: <Work />
    },
];

const ExperienceSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-16"
        >
            <Typography variant="h3" component="h2" sx={{ textAlign: 'center', fontWeight: 700, color: 'white', opacity: 0.8, my: 4 }} className="text-center mb-12">
                Experience
            </Typography>

            <Timeline position="alternate">
                {experiences.map((exp, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <TimelineDot color="primary">
                                    {exp.icon}
                                </TimelineDot>
                            </motion.div>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <Card elevation={3}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'black', opacity: 0.7 }} component="h3">
                                            {exp.title}
                                        </Typography>
                                        <Typography color="textSecondary" sx={{ fontWeight: 500, color: 'black', opacity: 0.7 }}>
                                            {exp.company}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'black', opacity: 0.7 }}>
                                            {exp.period}
                                        </Typography>
                                        <Typography variant="body1" className="mt-2" sx={{ fontWeight: 500, color: 'black', opacity: 0.7 }}>
                                            {exp.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </motion.div>
    );
};

export default ExperienceSection;
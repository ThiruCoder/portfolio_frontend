import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, IconButton, FormControl, InputLabel, Select, MenuItem, Chip, Modal, Backdrop, Fade } from '@mui/material';
import { Plus, Filter, Layout, Server, Database, Globe, Smartphone, ListFilterPlus, X } from 'lucide-react';
import SkillBar from '../UI/SkillBar';
import { useTheme } from '../UI/ThemeContext';
import { skillTags } from '../UI/skillTags';

// Mock Skills Data
const initialSkills = [
    { id: 's1', name: 'JavaScript', category: 'Frontend', proficiency: 9, experience: 5, certified: true },
    { id: 's2', name: 'React', category: 'Frontend', proficiency: 8, experience: 4, certified: true },
    { id: 's3', name: 'TypeScript', category: 'Frontend', proficiency: 7, experience: 3, certified: false },
    { id: 's4', name: 'Node.js', category: 'Backend', proficiency: 8, experience: 4, certified: true },
    { id: 's5', name: 'Express', category: 'Backend', proficiency: 8, experience: 4, certified: false },
    { id: 's6', name: 'MongoDB', category: 'Database', proficiency: 7, experience: 3, certified: true },
    { id: 's7', name: 'PostgreSQL', category: 'Database', proficiency: 6, experience: 2, certified: false },
    { id: 's8', name: 'Docker', category: 'DevOps', proficiency: 6, experience: 2, certified: true },
    { id: 's9', name: 'AWS', category: 'DevOps', proficiency: 5, experience: 2, certified: true },
    { id: 's10', name: 'GraphQL', category: 'Backend', proficiency: 7, experience: 2, certified: false },
    { id: 's11', name: 'Tailwind CSS', category: 'Frontend', proficiency: 8, experience: 3, certified: false },
    { id: 's12', name: 'Python', category: 'Backend', proficiency: 6, experience: 3, certified: true },
];
const skillCategories = [
    { name: 'Frontend', icon: <Layout size={20} /> },
    { name: 'Backend', icon: <Server size={20} /> },
    { name: 'Database', icon: <Database size={20} /> },
    { name: 'Other', icon: <Globe size={20} /> },
    { name: 'Tools', icon: <Smartphone size={20} /> },
];
const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 450, lg: 820, md: 600, sm: 500 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Skills = ({ resumeData = [], useCase }) => {
    const theme = useTheme();
    const [skills, setSkills] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [state, setState] = React.useState({ top: false });
    const [addSkill, setAddSkill] = React.useState({ top: false });
    const [formData, setFormData] = useState({ skills: [] })
    const [newSkill, setNewSkill] = useState({
        name: '',
        category: '',
        proficiency: 1,
        experience: 1,
        certified: false
    });

    useEffect(() => {
        if (resumeData.length > 0 && resumeData[0].skills) {
            setSkills(resumeData[0].skills);
        }
    }, [resumeData]);

    const [openModel, setOpenModel] = useState(false);
    const handleOpenModel = () => setOpenModel(true);
    const handleCloseModel = () => setOpenModel(false);

    const filteredSkills = activeCategory === 'all'
        ? skills
        : skills.filter(skill => skill.category.toLowerCase() === activeCategory.toLowerCase());

    const sortedSkills = [...filteredSkills].sort((a, b) => b.proficiency - a.proficiency);

    const totalProficiency = skills.reduce((sum, skill) => sum + skill.proficiency, 0);
    const averageProficiency = skills.length > 0 ? Math.round(totalProficiency / skills.length) : 0;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const addSkillToggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setAddSkill({ ...state, [anchor]: open });
    };

    const handleAddSkill = () => {
        if (newSkill.name && newSkill.category) {
            setFormData(prev => ({
                skills: [...prev.skills, newSkill]
            }));
            setNewSkill({
                name: '',
                category: '',
                proficiency: 1,
                experience: 1,
                certified: false
            });
        }
    };

    const handleRemoveSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const list = (anchor) => (
        <Paper elevation={3} sx={{ p: 3, }}>
            {/* <Typography variant="h6" gutterBottom>Skill Categories</Typography> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>
                <Typography variant="h6" fontWeight={600} mb={2}>Skill Categories</Typography>
                <IconButton sx={{ position: 'relative', bottom: 8 }} onClick={toggleDrawer(anchor, false)}>
                    <X />
                </IconButton>
            </Box>
            <List>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={3} sm={4}>
                        <ListItem disablePadding>
                            <ListItemButton selected={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>
                                <ListItemIcon><Filter size={18} /></ListItemIcon>
                                <ListItemText primary="All Skills" />
                            </ListItemButton>
                        </ListItem>
                    </Grid>
                    {skillCategories.map((category, index) => (
                        <Grid item xs={6} md={3} sm={4}>
                            <ListItem disablePadding key={index}>
                                <ListItemButton selected={activeCategory === category.name.toLowerCase()} onClick={() => setActiveCategory(category.name.toLowerCase())}>
                                    <ListItemIcon>{category.icon}</ListItemIcon>
                                    <ListItemText primary={category.name} />
                                </ListItemButton>
                            </ListItem>
                        </Grid>
                    ))}

                </Grid>
            </List>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>Skill Summary</Typography>
            <Box>
                <Box display="flex" justifyContent="space-between" mb={1}><Typography variant="body2">Total Skills</Typography><Typography variant="body2" fontWeight={500}>{skills.length}</Typography></Box>
                <Box display="flex" justifyContent="space-between" mb={1}><Typography variant="body2">Certified Skills</Typography><Typography variant="body2" fontWeight={500}>{skills.filter(skill => skill.certified).length}</Typography></Box>
                <Box display="flex" justifyContent="space-between" mb={1}><Typography variant="body2">Average Proficiency</Typography><Typography variant="body2" fontWeight={500}>{averageProficiency}/10</Typography></Box>
            </Box>
        </Paper>
    );

    const addSkills = (anchor) => {

        const handleAddSkills = (e) => {
            e.preventDefault();
            console.log('newSkill', formData);

        }
        return (
            <Box component={'form'} onSubmit={handleAddSkills}>

                <Fade in={openModel}>
                    <Box sx={styles}>
                        <Typography variant="h6" sx={{ mt: 3 }}>Skills</Typography>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={6} sx={{ mt: 2 }}>

                                <FormControl fullWidth>
                                    <InputLabel>Skill</InputLabel>
                                    <Select
                                        value={newSkill?.name ? newSkill?.name : null}
                                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                        label="Skill"
                                    >
                                        {skillTags.map(category => (
                                            <MenuItem key={category} value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category-select"
                                        value={newSkill?.category || ""}
                                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                                        label="Category"
                                    >
                                        {skillCategories.map(({ name, icon }) => (
                                            <MenuItem key={name} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                                <FormControl sx={{ minWidth: '100%' }}>
                                    <InputLabel>Profficient</InputLabel>
                                    <Select
                                        label="Profficient"
                                        id='profficient'
                                        value={newSkill?.proficiency}
                                        onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                                    >
                                        {[...Array(10)].map((_, index) => (
                                            <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                                <FormControl sx={{ minWidth: '100%' }}>
                                    <InputLabel>Experience</InputLabel>
                                    <Select
                                        label="Experience"
                                        id='Experience'
                                        value={newSkill?.experience}
                                        onChange={(e) => setNewSkill({ ...newSkill, experience: e.target.value })}
                                    >
                                        {[...Array(10)].map((_, index) => (
                                            <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    onClick={handleAddSkill}
                                    disabled={!newSkill?.name || !newSkill?.category}
                                    fullWidth
                                >
                                    Add
                                </Button>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        <Box>
                            {formData?.skills?.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill.name}
                                    onDelete={() => handleRemoveSkill(index)}
                                    sx={{ margin: 0.5 }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Fade>
            </Box>
        )
    }


    return (
        <Box p={4} sx={{ pt: useCase ? null : 12 }}>
            <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                {useCase ? null : <Typography variant="h5" fontWeight={600}
                    color='black'>Skills Inventory</Typography>}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <React.Fragment key={'top'}>
                        <Button onClick={toggleDrawer('top', true)} sx={{ display: { xs: 'flex', md: 'none' } }}
                            startIcon={<ListFilterPlus />} variant='outlined'>Filter</Button>
                        <Drawer
                            anchor={'top'}
                            open={state['top']}
                            onClose={toggleDrawer('top', false)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {list('top')}
                        </Drawer>
                    </React.Fragment>
                    <React.Fragment key={'top'}>
                        {useCase ? null :
                            <Button
                                onClick={handleOpenModel}
                                variant="contained"
                                color="primary"
                                startIcon={<Plus size={18} />}
                            >
                                Add Skill
                            </Button>
                        }
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openModel}
                            onClose={handleCloseModel}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    timeout: 500,
                                },
                            }}
                        >
                            {addSkills('top')}
                        </Modal>
                        {/* <Drawer
                            anchor={'top'}
                            open={addSkill['top']}
                            onClose={addSkillToggleDrawer('top', false)}
                        >
                            {addSkills('top')}
                        </Drawer> */}
                    </React.Fragment>
                </div>

            </Box>

            <Grid container spacing={4} mt={2}>
                <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
                        <Typography variant="h6" gutterBottom>Skill Categories</Typography>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton selected={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>
                                    <ListItemIcon><Filter size={18} /></ListItemIcon>
                                    <ListItemText primary="All Skills" />
                                </ListItemButton>
                            </ListItem>
                            {skillCategories.map((category, index) => (
                                <ListItem disablePadding key={index}>
                                    <ListItemButton selected={activeCategory === category.name.toLowerCase()} onClick={() => setActiveCategory(category.name.toLowerCase())}>
                                        <ListItemIcon>{category.icon}</ListItemIcon>
                                        <ListItemText primary={category.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h6" gutterBottom>Skill Summary</Typography>
                        <Box>
                            <Box display="flex" justifyContent="space-between" mb={1}><Typography variant="body2">Total Skills</Typography><Typography variant="body2" fontWeight={500}>{skills.length}</Typography></Box>
                            <Box display="flex" justifyContent="space-between" mb={1}><Typography variant="body2">Certified Skills</Typography><Typography variant="body2" fontWeight={500}>{skills.filter(skill => skill.certified).length}</Typography></Box>
                            <Box display="flex" justifyContent="space-between" mb={1}><Typography variant="body2">Average Proficiency</Typography><Typography variant="body2" fontWeight={500}>{averageProficiency}/10</Typography></Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            {activeCategory === 'all' ? 'All Skills' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Skills`}
                        </Typography>
                        {sortedSkills.length === 0 ? (
                            <Box textAlign="center" py={6}>
                                <Typography variant="body1" color="text.secondary">No skills found</Typography>
                                <Typography variant="body2" color="text.disabled">
                                    {activeCategory === 'all' ? 'Try adding some skills to your inventory' : `Try adding skills in the ${activeCategory} category`}
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                {sortedSkills.map(skill => (
                                    <SkillBar
                                        key={skill.id}
                                        name={skill.name}
                                        percentage={skill.proficiency}
                                        category={skill.category}
                                        experience={skill.experience}
                                        certified={skill.certified}
                                    />
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Skills;

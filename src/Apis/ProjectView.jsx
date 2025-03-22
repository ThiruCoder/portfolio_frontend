import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    Grid,
    Paper,
    Divider,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    FavoriteBorder as FavoriteBorderIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    SportsBasketball as DribbbleIcon,
} from '@mui/icons-material';
import ECommerceStore from '../ProjectTemplates/Template1';
import myPic from '../assets/passPhoto.jpg'
import Footer from '../HomePage/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../HomePage/Header';
import OnlineBankingDashboard from '../ProjectTemplates/Template3';
import { ChatBot } from '../ProjectTemplates/Template2';
import { FetchContext } from '../Context';

const ProjectDetails = () => {
    const [localData, setLocalData] = useState([])
    const { setProjects, projects } = useContext(FetchContext)
    console.log(projects);

    const { id } = useParams()


    useEffect(() => {
        const views = viewData?.filter(ite => ite?.id === Number(id))

        if (views) {
            setLocalData(views)
        }
    }, [viewData, id])

    console.log(id);

    const navigate = useNavigate()
    return (
        <Box sx={{ backgroundColor: '#29292a', color: '#F3F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navbar */}
            <Header />

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, maxWidth: '1536px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4, position: 'relative', top: 50 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        Modern Minimalist Interior Design
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<FavoriteBorderIcon sx={{ color: '#1B9AF5' }} />}
                        sx={{ backgroundColor: '#374151', color: '#F3F4F6', '&:hover': { backgroundColor: '#1B9AF5' } }}
                    >
                        238
                    </Button>
                </Box>
                {localData && localData.length > 0 ? localData?.map((template, index) => (
                    <>
                        {/* Project Image */}
                        <Box key={index} sx={{ borderRadius: 2, backgroundColor: '#1F2937', mb: 4, overflow: 'scroll', height: 500 }}>
                            {template?.template}
                        </Box>

                        {/* Project Content */}
                        <Grid container spacing={4}>
                            {/* Left Column */}
                            <Grid item xs={12} md={8}>
                                <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2, mb: 4 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'white', opacity: 0.8 }}>
                                        Project Description
                                    </Typography>
                                    <Typography key={index} variant="body1" sx={{ color: '#9CA3AF', mb: 2 }}>
                                        {template?.discreption}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                                        <strong style={{ color: 'white', opacity: 0.8, paddingBottom: 5 }}>Key Features</strong>
                                        <Box>
                                            {template?.id === 3 ?
                                                template?.keyFeatures?.map((ite, ind) => (
                                                    <Typography>
                                                        {ite}
                                                    </Typography>
                                                ))

                                                : template?.keyFeatures.map((ite, ind) => (
                                                    <Typography variant="body1" sx={{ color: '#9CA3AF' }} key={ind}>
                                                        {ite}
                                                    </Typography>
                                                ))}
                                        </Box>
                                    </Box>
                                </Paper>

                                <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'white', opacity: 0.8 }}>
                                        Project Details
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {template?.projectDetails.map((detail, index) => (
                                            <Grid item xs={12} sm={6} key={index}>
                                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                    {detail.label}
                                                </Typography>
                                                <Typography variant="body1" sx={{ color: '#F3F4F6' }}>
                                                    {detail.value}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Right Column */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2, mb: 4 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'white', opacity: 0.8 }}>
                                        Designer
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            src={myPic}
                                            alt="Designer"
                                            sx={{ height: 48, width: 48 }}
                                        />
                                        <Box>
                                            <Typography variant="body1" sx={{ color: '#F3F4F6', fontWeight: 'medium' }}>
                                                Charipalli Thirumalesh
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                Lead Interior Designer
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>

                                <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'white', opacity: 0.8 }}>
                                        Project Stats
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {[
                                            { label: 'Views', value: '1.2k', progress: 75 },
                                            { label: 'Likes', value: '238', progress: 45 },
                                            { label: 'Comments', value: '42', progress: 25 },
                                        ].map((stat, index) => (
                                            <Box key={index}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                        {stat.label}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#F3F4F6' }}>
                                                        {stat.value}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ height: 8, backgroundColor: '#374151', borderRadius: 4 }}>
                                                    <Box
                                                        sx={{
                                                            height: '100%',
                                                            backgroundColor: '#1B9AF5',
                                                            borderRadius: 4,
                                                            width: `${stat.progress}%`,
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                )) : null}
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default ProjectDetails;


const viewData = [
    {
        id: 1,
        template: <ECommerceStore />,
        discreption: 'The eCommerce platform is a web-based application designed to facilitate online buying and selling of products. It provides users with a seamless shopping experience, including product browsing, cart management, secure payments, and order tracking.',
        keyFeatures: [`✅ User Management – Sign up, login, profile management, and authentication (OAuth, JWT).`,
            '✅ Product Catalog – Dynamic product listing with categories, filters, and search functionality.',
            '✅ Shopping Cart & Wishlist – Add, remove, and manage cart and wishlist items.',
            '✅ Payment Integration – Secure payment gateway (Stripe, Razorpay, PayPal, etc.).',
            '✅ Order Management – Order placement, tracking, and history.',
            '✅ Admin Dashboard – Manage products, users, orders, and sales reports.',
            '✅ Reviews & Ratings – User feedback system for products.',
            '✅ Responsive UI/UX – Mobile-friendly design for seamless access.'],
        projectDetails: [
            { label: 'Client', value: '---' },
            { label: 'Location', value: 'Hyderabad, Telangana' },
            { label: 'Completion', value: 'December 2024' },
        ],
    },
    {
        id: 2,
        template: <ChatBot />,
        discreption: "The React ChatBot is a simple AI-powered chatbot application built using React.js, Material-UI (MUI), and Axios. It allows users to send messages, and the bot responds using the OpenAI API (GPT-3.5-Turbo). The chatbot interface is styled with Material-UI, making it clean and user-friendly. Users can type messages, press 'Enter' or click the send button to interact with the chatbot, and receive AI-generated responses.",
        keyFeatures: [`✅ AI-Powered Chatbot: Uses OpenAI's GPT API to generate intelligent responses.`,
            ' ✅ Real-Time Messaging: Allows users to send messages and get instant replies.',
            '✅ Material-UI Styling: Clean and modern UI using MUI components.',
            '✅ Responsive Design: The chat UI automatically adjusts message alignment (left for bot, right for the user).',
            '✅ Keyboard Support: Users can press Enter to send messages.',
            "✅ State Management: Uses React's useState hook to manage chat messages.",
            '✅ API Integration: Uses axios to send requests to the OpenAI API.',
            '✅ Error Handling: Displays an error message if the API request fails.'],
        projectDetails: [
            { label: 'Client', value: '---' },
            { label: 'Location', value: 'Hyderabad, Telangana' },
            { label: 'Completion', value: 'December 2024' },
        ],
    },
    {
        id: 3,
        template: <OnlineBankingDashboard />,
        discreption: "The Online Banking Dashboard is a modern and user-friendly web application designed to help users manage their bank accounts, track transactions, and access banking services in real time. The dashboard provides a seamless banking experience with an intuitive UI, real-time financial insights, and secure transactions.",
        keyFeatures:
            [{
                User_Account_Management: [
                    `✅ Secure login and authentication (OAuth, JWT).`,
                    '✅ Profile management with editable user details.',
                    '✅ Multi-user access with role-based permissions.',
                ]
            }, {
                Account_Overview_Transactions: [
                    '✅ View account balance and transaction history.',
                    '✅ Filter transactions by date, category, or type (debit/credit).',
                    '✅ Download account statements in PDF/CSV format.'
                ]
            }, {
                Fund_Transfers_Payments: [
                    '✅ Transfer money between own accounts or to other users.',
                    '✅ Scheduled and recurring payments (bills, loans, etc.).',
                    '✅ Instant payment confirmation and transaction receipts.',

                ]
            }, {
                Financial_Insights_Reports: [
                    '✅ Real-time expense tracking and budgeting tools.',
                    '✅ Graphical insights with charts for income vs. expenses.',
                    '✅ Personalized financial recommendations.'
                ]
            }],
        projectDetails: [
            { label: 'Client', value: '---' },
            { label: 'Location', value: 'Hyderabad, Telangana' },
            { label: 'Completion', value: 'December 2024' },
        ],
    }
]


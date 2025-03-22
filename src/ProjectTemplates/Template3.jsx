import React, { useEffect, useRef } from 'react';
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
    TextField,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    ArrowDownward as ArrowDownwardIcon,
    ArrowUpward as ArrowUpwardIcon,
    SyncAlt as SyncAltIcon,
    Receipt as ReceiptIcon,
    Smartphone as SmartphoneIcon,
    Headset as HeadsetIcon,
    Search as SearchIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';
// import * as echarts from 'echarts';

const OnlineBankingDashboard = () => {
    const chartRef = useRef(null);



    return (
        <Box sx={{ backgroundColor: '#111827', color: '#F3F4F6', minHeight: '100vh' }}>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Avatar src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png" alt="Bank Logo" sx={{ height: 32, width: 32 }} />
                        <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
                            <Button variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                Dashboard
                            </Button>
                            <Button color="inherit">Payments</Button>
                            <Button color="inherit">Transfers</Button>
                            <Button color="inherit">Services</Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                                src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a young business person with a friendly smile, wearing formal attire, against a neutral background&width=100&height=100&orientation=squarish&flag=ece93ae1-9d9a-4ed4-8fc1-064cee20e725"
                                alt="User"
                                sx={{ height: 32, width: 32 }}
                            />
                            <Typography variant="body1">John Doe</Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ maxWidth: '1536px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Column */}
                    <Grid item xs={12} lg={8}>
                        {/* Account Summary */}
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3, mb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
                                    Account Summary
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                    Last updated: Today, 12:30 PM
                                </Typography>
                            </Box>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                {[
                                    { label: 'Total Balance', value: '$24,150.75' },
                                    { label: 'Monthly Income', value: '$8,250.00' },
                                    { label: 'Monthly Expenses', value: '$3,850.25' },
                                ].map((item, index) => (
                                    <Grid item xs={12} sm={4} key={index}>
                                        <Paper sx={{ backgroundColor: '#111827', p: 2, borderRadius: 2 }}>
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                {item.label}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {item.value}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box ref={chartRef} sx={{ height: 300 }} />
                        </Paper>

                        {/* Withdraw and Deposit Forms */}
                        <Grid container spacing={4} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={6}>
                                <Paper sx={{ backgroundColor: '#1F2937', p: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                        Withdraw Money
                                    </Typography>
                                    <Box component="form">
                                        <TextField
                                            fullWidth
                                            label="Amount"
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            InputProps={{
                                                startAdornment: <Typography sx={{ color: '#9CA3AF', mr: 1 }}>$</Typography>,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="From Account"
                                            variant="outlined"
                                            select
                                            sx={{ mb: 2 }}
                                        >
                                            <MenuItem value="checking">Checking Account (*1234)</MenuItem>
                                            <MenuItem value="savings">Savings Account (*5678)</MenuItem>
                                        </TextField>
                                        <Button variant="contained" fullWidth sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                            Withdraw
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper sx={{ backgroundColor: '#1F2937', p: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                        Deposit Money
                                    </Typography>
                                    <Box component="form">
                                        <TextField
                                            fullWidth
                                            label="Amount"
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                            InputProps={{
                                                startAdornment: <Typography sx={{ color: '#9CA3AF', mr: 1 }}>$</Typography>,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="To Account"
                                            variant="outlined"
                                            select
                                            sx={{ mb: 2 }}
                                        >
                                            <MenuItem value="checking">Checking Account (*1234)</MenuItem>
                                            <MenuItem value="savings">Savings Account (*5678)</MenuItem>
                                        </TextField>
                                        <Button variant="contained" fullWidth sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                            Deposit
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} lg={4}>
                        {/* Quick Actions */}
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3, mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                Quick Actions
                            </Typography>
                            <Grid container spacing={2}>
                                {[
                                    { icon: <SyncAltIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, label: 'Transfer' },
                                    { icon: <ReceiptIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, label: 'Pay Bills' },
                                    { icon: <SmartphoneIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, label: 'Mobile Deposit' },
                                    { icon: <HeadsetIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, label: 'Support' },
                                ].map((action, index) => (
                                    <Grid item xs={6} key={index}>
                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            <Paper
                                                sx={{
                                                    backgroundColor: '#111827',
                                                    p: 2,
                                                    borderRadius: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {action.icon}
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {action.label}
                                                </Typography>
                                            </Paper>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>

                        {/* Recent Transactions */}
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
                                    Recent Transactions
                                </Typography>
                                <Button color="primary">View All</Button>
                            </Box>
                            <List>
                                {[
                                    { type: 'deposit', label: 'Salary Deposit', date: 'Today, 10:00 AM', amount: '+$3,500.00', color: 'green' },
                                    { type: 'purchase', label: 'Amazon Purchase', date: 'Yesterday', amount: '-$85.99', color: 'red' },
                                    { type: 'subscription', label: 'Netflix Subscription', date: 'Mar 15, 2024', amount: '-$14.99', color: 'red' },
                                ].map((transaction, index) => (
                                    <ListItem key={index} sx={{ py: 1.5 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: `${transaction.color}500/10` }}>
                                                {transaction.type === 'deposit' ? (
                                                    <ArrowDownwardIcon sx={{ color: `${transaction.color}500` }} />
                                                ) : (
                                                    <ArrowUpwardIcon sx={{ color: `${transaction.color}500` }} />
                                                )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={transaction.label}
                                            secondary={transaction.date}
                                            sx={{ color: '#F3F4F6' }}
                                        />
                                        <Typography variant="body2" sx={{ color: `${transaction.color}500` }}>
                                            {transaction.amount}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Transaction History */}
                    <Grid item xs={12}>
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
                                    Transaction History
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        placeholder="Search transactions..."
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#111827',
                                            borderRadius: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: 'transparent' },
                                                '&:hover fieldset': { borderColor: '#1B9AF5' },
                                            },
                                            '& .MuiInputBase-input': { color: '#F3F4F6' },
                                        }}
                                        InputProps={{
                                            startAdornment: <SearchIcon sx={{ color: '#9CA3AF', mr: 1 }} />,
                                        }}
                                    />
                                    <Button variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                        Export
                                    </Button>
                                </Box>
                            </Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Balance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[
                                        { date: 'Mar 16, 2024', description: 'Salary Deposit', type: 'Deposit', amount: '+$3,500.00', balance: '$24,150.75', color: 'green' },
                                        { date: 'Mar 15, 2024', description: 'Amazon Purchase', type: 'Purchase', amount: '-$85.99', balance: '$20,650.75', color: 'red' },
                                        { date: 'Mar 15, 2024', description: 'Netflix Subscription', type: 'Subscription', amount: '-$14.99', balance: '$20,735.74', color: 'red' },
                                    ].map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        backgroundColor: `${row.color}500/10`,
                                                        color: `${row.color}500`,
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        width: 'fit-content',
                                                    }}
                                                >
                                                    {row.type}
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ color: `${row.color}500` }}>{row.amount}</TableCell>
                                            <TableCell>{row.balance}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default OnlineBankingDashboard;
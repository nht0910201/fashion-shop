import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { userRegister, verifyUser } from '../../services/AuthService';
import { useState } from 'react';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessNavigate } from "../../components/Alert/UpdateSuccessNavigate";
import {UpdateError } from '../../components/Alert/UpdateError'
const steps = ['Thông tin', 'Xác thực'];

const theme = createTheme();

export default function SignUp() {
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = async (e) => {
        let checkName = !validator.isEmpty(name)
        let checkEmail = validator.isEmail(email)
        let checkAddress = !validator.isEmpty(address)
        let checkPhone = !validator.isEmpty(phone)
        let checkPassword = !validator.isEmpty(password) && password.length>=8
        let checkConfirmPass = !validator.isEmpty(confirmPassword) && (password === confirmPassword)
        if (checkName && checkEmail && checkAddress && checkPhone && checkPassword && checkConfirmPass) {
            let check = await register({name,email,password,phone,address,gender})
            if(check.data.success){
                setActiveStep(activeStep + 1);
            }
        }else{
            toast.error('Vui lòng kiểm tra lại các thông tin', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const [name, setName] = useState('');
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const [email, setEmail] = useState('');
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState('');
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const [phone, setPhone] = useState('');
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const [address, setAddress] = useState('');
    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const [gender, setGender] = useState('male');
    const handleChangeGender = (e) => {
        setGender(e.target.value)
    }
    const [otp, setOtp] = useState('');
    const handleChangeOtp= (e) => {
        setOtp(e.target.value)
    }
    const register = async ({ name, email, password, phone, address, gender }) => {
        const res = await userRegister({ name, email, password, phone, address, gender })
        return res
    }
    let type = 'register';
    const handleOnClick = async () => {
        const wait = toast.loading("Vui lòng chờ ...")
        let check = await verifyUser({otp,email,type});
        if(check.data.success){
            let url='/'
            UpdateSuccessNavigate(wait,'Đăng ký thành công',url)
            // navigate('/') 
        }else{
            // toast.error('Xác thực thất bại', {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     draggable: true,
            //     progress: undefined,
            // });
            UpdateError(wait,'Xác thực thất bại')
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        ĐĂNG KÝ
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === 0 ? <>
                            <Typography variant="h6" style={{ textAlign: 'center' }} gutterBottom>
                                THÔNG TIN CÁ NHÂN
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        type={'text'}
                                        // autoComplete="given-name"
                                        variant="standard"
                                        value={name}
                                        onChange={handleChangeName}
                                        // error={validator.isEmpty(name) ? true : false}
                                        // helperText='Vui lòng nhập tên'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">Age</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            label="Gender"
                                            id="gender"
                                            value={gender}
                                            onChange={handleChangeGender}
                                        >
                                            <MenuItem value='male'>Male</MenuItem>
                                            <MenuItem value='female'>Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        type={'email'}
                                        // autoComplete="family-name"
                                        variant="standard"
                                        value={email}
                                        onChange={handleChangeEmail}
                                        // error={validator.isEmail(email) ? false : true}
                                        // helperText='Vui lòng nhập chính xác email'
                                    />
                                    <span id="errEmail"></span>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        type={'text'}
                                        fullWidth
                                        variant="standard"
                                        value={address}
                                        onChange={handleChangeAddress}
                                        // error={validator.isEmpty(address) ? true : false}
                                        // helperText='Vui lòng nhập địa chỉ'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        fullWidth
                                        type={'text'}
                                        variant="standard"
                                        value={phone}
                                        onChange={handleChangePhone}
                                        // error={validator.isEmpty(phone) ? true : false}
                                        // helperText='Vui lòng nhập số điện thoại'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="password"
                                        label="Password"
                                        type={'password'}
                                        fullWidth
                                        variant="standard"
                                        value={password}
                                        onChange={handleChangePassword}
                                        // error={(validator.isEmpty(password) || password.length<8) ? true : false}
                                        // helperText='Vui lòng nhập password tối thiểu có độ dài 8 kí tự'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="confirm"
                                        label="Confirm Password"
                                        type={'password'}
                                        fullWidth
                                        variant="standard"
                                        value={confirmPassword}
                                        onChange={handleChangeConfirmPassword}
                                        // error={validator.isEmpty(confirmPassword) ? true : false}
                                        // helperText='Vui lòng nhập lại password đã nhập ở trên'
                                    />
                                </Grid>
                            </Grid>
                        </> : <></>}
                        {activeStep === 1 ? <>
                            <Typography variant="h6" align="center" gutterBottom>
                                XÁC THỰC
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="OTP"
                                        label="OTP"
                                        type={'password'}
                                        fullWidth
                                        variant="standard"
                                        value={otp}
                                        onChange={handleChangeOtp}
                                        // error={validator.isEmpty(otp) ? true : false}
                                        // helperText='Vui lòng nhập OTP đã được gửi đến email của bạn'
                                    />
                                </Grid>
                                <Button style={{ fontSize: 12, marginLeft:'auto', marginRight:'auto', marginTop:'3px'}} color="secondary">Gửi lại OTP</Button>
                            </Grid>
                        </> : <></>}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleBack}
                                sx={{ mt: 3, ml: 1 }}
                                disabled={activeStep === 0 ? true : false}
                            >
                                <ArrowBackIcon />
                            </Button>
                            <Button
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                                disabled={activeStep === steps.length - 1 ? true : false}
                            >
                                <ArrowForwardIcon />
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleOnClick}
                                sx={{ mt: 3, ml: 1 }}
                                // hidden={activeStep !== steps.length - 1 ? true : false}
                                disabled={activeStep === steps.length - 1 ? false : true}
                            >
                                Đăng ký
                            </Button>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    );
}
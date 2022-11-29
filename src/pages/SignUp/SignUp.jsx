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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getDistrict, getProvince, getWard, userRegister, verifyUser } from '../../services/AuthService';
import { useState } from 'react';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessNavigate } from "../../components/Alert/UpdateSuccessNavigate";
import { UpdateError } from '../../components/Alert/UpdateError'
import { useEffect } from 'react';
const steps = ['Thông tin', 'Xác thực'];

const theme = createTheme();

export default function SignUp() {

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    useEffect(() => {
        async function getProvinceAPI(data) {
            let provinces = await getProvince({ data })
            if (provinces.message === 'Success') {
                setProvinces(provinces.data)
            }
        }
        getProvinceAPI({})
    }, [])
    useEffect(() => {
        async function getDistrictAPI(province_id) {
            let districts = await getDistrict({ province_id })
            if (districts.message === 'Success') {
                setDistricts(districts.data)
            }
        }
        if (province !== undefined) {
            setDistrict(undefined)
            setWard(undefined)
            setDistricts([])
            setWards([])
            getDistrictAPI(province)
        }
    }, [province])
    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id })
            if (wards.message === 'Success') {
                setWards(wards.data)
            }
        }
        if (district !== undefined) {
            getWardAPI(district)
        }
    }, [district, province])
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = async (e) => {
        let checkName = validator.isEmpty(name)
        let checkEmail = validator.isEmail(email)
        let checkAddress = validator.isEmpty(address)
        let checkPhone = validator.isMobilePhone(phone,'vi-VN')
        let checkPassword = validator.isEmpty(password)
        let checkConfirmPass = validator.isEmpty(confirmPassword)
        if(checkName){
            toast.error('Vui lòng nhập tên', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } 
        else if(!checkEmail){
            toast.error('Email không hợp lệ. Vui lòng nhập lại', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if(province === undefined){
            toast.error('Vui lòng chọn tỉnh thành', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if(district === undefined){
            toast.error('Vui lòng chọn quận huyện', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if(ward === undefined){
            toast.error('Vui lòng chọn xã phường', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if(checkAddress){
            toast.error('Vui lòng nhập địa chỉ của bạn', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (!checkPhone){
            toast.error('Số điện thoại không hợp lệ. Vui lòng nhập lại', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (checkPassword){
            toast.error('Vui lòng nhập mật khẩu của bạn', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if(password.length < 8){
            toast.error('Vui lòng nhập mật khẩu của bạn có độ dài hơn 8 kí tự', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if(checkConfirmPass){
            toast.error('Vui lòng nhập lại mật khẩu của bạn', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if(password !== confirmPassword){
            toast.error('Vui lòng nhập lại mật khẩu chính xác', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            let check = await register({ name, email, password, phone, province, district, ward, address, gender })
            if (check.data.success) {
                setActiveStep(activeStep + 1);
            }
        }
    };
    const handleChangeWard = (e) => {
        setWard(e.target.value)
    }
    const handleChangeDistrict = (e) => {
        setDistrict(e.target.value)
        setWard(undefined)
        setWards([])
    }
    const handleChangeProvince = (e) => {
        setProvince(e.target.value)
        setDistrict(undefined)
        setWard(undefined)
    }
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
    const handleChangeOtp = (e) => {
        setOtp(e.target.value)
    }
    const register = async ({ name, email, password, phone, province, district, ward, address, gender }) => {
        const res = await userRegister({ name, email, password, phone, province, district, ward, address, gender })
        return res
    }
    let type = 'register';
    const handleOnClick = async () => {
        if(validator.isEmpty(otp)){
            toast.error('Vui lòng nhập OTP', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }else{
            const wait = toast.loading("Vui lòng chờ ...")
            let check = await verifyUser({ otp, email, type });
            if (check.data.success) {
                UpdateSuccessNavigate(wait, 'Đăng ký thành công', '/')
            } else {
                UpdateError(wait, 'Xác thực thất bại')
            }
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
                                        label="Tên"
                                        fullWidth
                                        type={'text'}
                                        variant="standard"
                                        value={name}
                                        onChange={handleChangeName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='standard' fullWidth>
                                        <InputLabel id="gender-label">Giới tính</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            label="Giới tính"
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
                                        variant="standard"
                                        value={email}
                                        onChange={handleChangeEmail}
                                    />
                                    <span id="errEmail"></span>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl variant='standard' fullWidth margin='normal'>
                                                <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                                                <Select
                                                    labelId="province-label"
                                                    label="Tỉnh/Thành phố"
                                                    id="province"
                                                    value={province}
                                                    onChange={handleChangeProvince}
                                                >
                                                    {provinces.map((provinceItem) => (
                                                        <MenuItem key={provinceItem.ProvinceID} value={provinceItem.ProvinceID}>
                                                            {provinceItem.ProvinceName}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl disabled={province === undefined ? true : false} variant='standard' fullWidth margin='normal'>
                                                <InputLabel id="district-label">Quận/Huyện</InputLabel>
                                                <Select
                                                    labelId="district-label"
                                                    label="Quận/Huyện"
                                                    id="district"
                                                    value={district}
                                                    onChange={handleChangeDistrict}
                                                >
                                                    {districts.map((districtItem) => (
                                                        <MenuItem key={districtItem.DistrictID} value={districtItem.DistrictID}>
                                                            {districtItem.DistrictName}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl disabled={district === undefined ? true : false} variant='standard' fullWidth margin='normal'>
                                                <InputLabel id="ward-label">Phường/Xã</InputLabel>
                                                <Select
                                                    labelId="ward-label"
                                                    label="Phường/Xã"
                                                    id="ward"
                                                    value={ward}
                                                    onChange={handleChangeWard}
                                                >
                                                    {wards.map((wardItem) => (
                                                        <MenuItem key={wardItem.WardCode} value={wardItem.WardCode}>
                                                            {wardItem.WardName}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="address"
                                                name="address"
                                                label="Địa chỉ"
                                                type={'text'}
                                                fullWidth
                                                variant="standard"
                                                sx={{ marginTop: 2 }}
                                                value={address}
                                                onChange={handleChangeAddress}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phone"
                                        label="Số điện thoại"
                                        fullWidth
                                        type={'number'}
                                        variant="standard"
                                        value={phone}
                                        onChange={handleChangePhone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="password"
                                        label="Mật khẩu"
                                        type={'password'}
                                        fullWidth
                                        variant="standard"
                                        value={password}
                                        onChange={handleChangePassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="confirm"
                                        label="Nhập lại mật khẩu"
                                        type={'password'}
                                        fullWidth
                                        variant="standard"
                                        value={confirmPassword}
                                        onChange={handleChangeConfirmPassword}
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
                                    />
                                </Grid>
                                <Button style={{ fontSize: 12, marginLeft: 'auto', marginRight: 'auto', marginTop: '3px' }} color="secondary">Gửi lại OTP</Button>
                            </Grid>
                        </> : <></>}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
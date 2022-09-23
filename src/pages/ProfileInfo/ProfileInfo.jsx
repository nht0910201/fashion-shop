import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import { Avatar } from '@nextui-org/react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ChangeCircleOutlined, CheckCircleOutline } from '@mui/icons-material';
import { getUserByID, updateAvatarUserByID, updateUserByID } from '../../services/UserService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function ProfileInfo() {
    const { id } = useParams();
    const [user, setUser] = useState({})
    useEffect(() => {
        async function getData() {
            let res = await getUserByID(id)
            if (res.success) {
                res.data.gender = res.data.gender.toLowerCase()
                setUser(res.data)
            }
        }
        getData()
    }, [id])
    const handleChangeName = (e) => {
        setUser({ ...user, name: e.target.value })
    }
    const handleChangePhone = (e) => {
        setUser({ ...user, phone: e.target.value })
    }
    const handleChangeAddress = (e) => {
        setUser({ ...user, address: e.target.value })
    }
    const handleChangeGender = (e) => {
        setUser({ ...user, gender: e.target.value.toLowerCase() })
        console.log(e.target.value)
    }

    const updateInfo = async (data, id) => {
        let res = await updateUserByID(data, id)
        if (res.success) {
            toast.success('Cập nhật thông tin thành công', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setUser({ ...res.data, gender: res.data.gender.toLowerCase() })
        } else {
            toast.error('Cập nhật không thành công', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleSaveInfo = () => {
        updateInfo(user, id)
    }
    const [file, setFile] = useState(null)
    const handleUploadFile = (e) => {
        setFile(e.target.files[0])
    }
    const updateAvatar = async (id) => {
        const data = new FormData();
        data.append('file', file)
        let res = await updateAvatarUserByID(data, id)
        console.log(res)
        if (res.data.success) {
            window.localStorage.setItem('avatar', JSON.stringify(res.data.data.avatar));
            setUser({ ...res.data, avatar: res.data.data.avatar })
            toast.success('Cập nhật thông tin thành công', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Cập nhật không thành công', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleSaveAvatar = () => {
        updateAvatar(id)

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg" /> */}
                    <Avatar
                        src={user.avatar === '' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png' : user.avatar}
                        css={{ size: "$20" }}
                    />
                    <Typography component="h1" variant="h5">
                        <Button

                            variant="text"
                            component="label"
                        >
                            <ChangeCircleOutlined />
                            <input
                                type="file"
                                hidden
                                onChange={handleUploadFile}
                                accept=".jpg,.png"
                            />
                        </Button>
                        <Button

                            variant="text"
                            component="label"
                            color='success'
                            onClick={handleSaveAvatar}
                        >
                            <CheckCircleOutline />
                        </Button>
                    </Typography>
                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            InputLabelProps={{ shrink: true }}
                            label="Name"
                            // placeholder='Name'
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChangeName}
                        // autoComplete="email"
                        // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            InputLabelProps={{ shrink: true }}
                            label="Phone"
                            type="text"
                            id="phone"
                            value={user.phone}
                            onChange={handleChangePhone}
                        // autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="address"
                            InputLabelProps={{ shrink: true }}
                            label="Address"
                            type="text"
                            id="address"
                            value={user.address}
                            onChange={handleChangeAddress}
                        // autoComplete="current-password"
                        />
                        <FormControl fullWidth margin='normal'>
                            <InputLabel shrink id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"

                                label="Gender"
                                id="gender"
                                value={'other'}
                                onChange={handleChangeGender}
                            >
                                <MenuItem value='male'>Male</MenuItem>
                                <MenuItem value='female'>Female</MenuItem>
                                <MenuItem value='other'>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={handleSaveInfo}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    );
}
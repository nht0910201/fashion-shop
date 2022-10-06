import * as React from 'react';
import { Avatar, Badge, Row } from '@nextui-org/react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getUserByID, updateUserByID } from '../../services/UserService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalChangePass from './ModalChangePass';
import ModalChangeAvatar from './ModalChangeAvatar';
import Loading from '../../components/Loading/Loading';
import { UpdateSuccessReload } from './../../components/Alert/UpdateSuccessReload';
import { UpdateError } from '../../components/Alert';


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
    }
    const updateInfo = async (data, id) => {
        const wait = toast.loading("Vui lòng chờ ...")
        let res = await updateUserByID(data, id)
        if (res.success) {
            UpdateSuccessReload(wait,'Cập nhật thông tin thành công',false)
            setUser({ ...res.data, gender: res.data.gender.toLowerCase() })
        } else {
            UpdateError(wait,'Cập nhật không thành công')
        }
    }
    const handleSaveInfo = () => {
        updateInfo(user, id)
    }
    if (user.id === undefined) {
        return (
            <Loading/>
        )
    }
    return (
        <Container sx={{ boxShadow: 3, borderRadius: 1 }} component="main" maxWidth="sm" >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Badge
                    content={<ModalChangeAvatar user={user} />}
                    
                    disableOutline
                    placement="bottom-right"
                    css={{ p: 0 }}
                    shape="circle"
                    size="xs">
                    <Avatar
                        src={user.avatar}
                        css={{ size: "$20", marginTop: '$10' }}
                    />
                </Badge>

                <Box noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        InputLabelProps={{ shrink: true }}
                        label="Name"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChangeName}
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
                    <Row justify="space-around" align='center'>
                        <ModalChangePass />
                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleSaveInfo}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Lưu
                        </Button>
                    </Row>

                </Box>
            </Box>
            <ToastContainer />
        </Container>
    );
}
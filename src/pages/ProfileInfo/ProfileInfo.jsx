import * as React from 'react';
import { Avatar, Badge, Row } from '@nextui-org/react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FormControl, Grid, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';
import { getUserByID, updateUserByID } from '../../services/UserService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalChangePass from './ModalChangePass';
import ModalChangeAvatar from './ModalChangeAvatar';
import { UpdateSuccessReload } from './../../components/Alert/UpdateSuccessReload';
import { UpdateError } from '../../components/Alert';
import { getDistrict, getProvince, getWard } from '../../services/AuthService';

export default function ProfileInfo() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoad] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        async function getData() {
            setLoad(true);
            let res = await getUserByID(id);
            if (res.success) {
                res.data.gender = res.data.gender.toLowerCase();
                setUser(res.data);
                setLoad(false);
            }
        }
        getData();
    }, [id]);
    useEffect(() => {
        async function getProvinceAPI(data) {
            let provinces = await getProvince({ data });
            if (provinces.message === 'Success') {
                setProvinces(provinces.data);
            }
        }
        getProvinceAPI({});
    }, []);
    useEffect(() => {
        async function getDistrictAPI(province_id) {
            let districts = await getDistrict({ province_id });
            if (districts.message === 'Success') {
                setDistricts(districts.data);
            }
        }
        if (user.province !== undefined) {
            getDistrictAPI(user.province);
        }
    }, [user.province]);
    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id });
            if (wards.message === 'Success') {
                setWards(wards.data);
            }
        }
        if (user.district !== undefined) {
            getWardAPI(user.district);
        }
    }, [user.district, user.province]);
    const handleChangeWard = (e) => {
        setUser({ ...user, ward: e.target.value });
    };
    const handleChangeDistrict = (e) => {
        setUser({ ...user, district: e.target.value, ward: undefined });
    };
    const handleChangeProvince = (e) => {
        setUser({ ...user, province: e.target.value, district: undefined, ward: undefined });
    };
    const handleChangeName = (e) => {
        setUser({ ...user, name: e.target.value });
    };
    const handleChangePhone = (e) => {
        setUser({ ...user, phone: e.target.value });
    };
    const handleChangeAddress = (e) => {
        setUser({ ...user, address: e.target.value });
    };
    const handleChangeGender = (e) => {
        setUser({ ...user, gender: e.target.value.toLowerCase() });
    };
    const updateInfo = async (data, id) => {
        const wait = toast.loading('Vui lòng chờ ...');
        let checkName = user.name;
        let checkPhone = user.phone;
        let checkProvince = user.province;
        let checkDistrict = user.district;
        let checkWard = user.ward;
        if (
            checkName !== '' &&
            checkPhone !== '' &&
            checkProvince !== undefined &&
            checkDistrict !== undefined &&
            checkWard !== undefined
        ) {
            let res = await updateUserByID(data, id);
            if (res.success) {
                UpdateSuccessReload(wait, 'Cập nhật thông tin thành công', false);
                setUser({ ...res.data, gender: res.data.gender.toLowerCase() });
            } else {
                UpdateError(wait, 'Cập nhật không thành công');
            }
        } else {
            UpdateError(wait, 'Vui lòng kiểm tra lại thông tin');
        }
    };
    const handleSaveInfo = () => {
        updateInfo(user, id);
    };

    return (
        <Container sx={{ boxShadow: 3, borderRadius: 1 }} component="main" maxWidth="sm">
            <CssBaseline />
            {loading ? (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Skeleton variant="circular" width={80} height={80} sx={{ marginBottom: 3 }} />
                    <Skeleton variant="rectangular" width={480} height={60} sx={{ marginBottom: 3 }} />
                    <Skeleton variant="rectangular" width={480} height={60} sx={{ marginBottom: 3 }} />
                    <Skeleton variant="rectangular" width={480} height={60} sx={{ marginBottom: 3 }} />
                    <Skeleton variant="rectangular" width={480} height={60} sx={{ marginBottom: 3 }} />
                </Box>
            ) : (
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
                        size="xs"
                    >
                        <Avatar src={user.avatar} css={{ size: '$20', marginTop: '$10' }} />
                    </Badge>

                    <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            InputLabelProps={{ shrink: true }}
                            label="Tên"
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
                            label="Số điện thoại"
                            type="number"
                            id="phone"
                            value={user.phone}
                            onChange={handleChangePhone}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                                    <Select
                                        labelId="province-label"
                                        label="Tỉnh/Thành phố"
                                        id="province"
                                        value={user.province}
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
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="district-label">Quận/Huyện</InputLabel>
                                    <Select
                                        labelId="district-label"
                                        label="Quận/Huyện"
                                        id="district"
                                        value={user.district}
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="ward-label">Phường/Xã</InputLabel>
                                    <Select
                                        labelId="ward-label"
                                        label="Phường/Xã"
                                        id="ward"
                                        value={user.ward}
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
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="address"
                                    InputLabelProps={{ shrink: true }}
                                    label="Địa chỉ"
                                    type="text"
                                    id="address"
                                    value={user.address}
                                    onChange={handleChangeAddress}
                                />
                            </Grid>
                        </Grid>

                        <FormControl fullWidth margin="normal">
                            <InputLabel shrink id="gender-label">
                                Giới tính
                            </InputLabel>
                            <Select
                                labelId="gender-label"
                                label="Gender"
                                id="gender"
                                value={user.gender}
                                onChange={handleChangeGender}
                            >
                                <MenuItem value="male">Nam</MenuItem>
                                <MenuItem value="female">Nữ</MenuItem>
                                <MenuItem value="other">Khác</MenuItem>
                            </Select>
                        </FormControl>
                        <Row justify="space-around" align="center">
                            <ModalChangePass />
                            <Button type="button" variant="contained" onClick={handleSaveInfo} sx={{ mt: 3, mb: 2 }}>
                                Lưu
                            </Button>
                        </Row>
                    </Box>
                </Box>
            )}

            <ToastContainer />
        </Container>
    );
}

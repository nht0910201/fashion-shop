import { Grid } from "@nextui-org/react";
import SideBar from "../components/SideBar";

function AdminLayout({children}) {
    return (
        <div>
            <Grid.Container gap={1}>
                <Grid xs={12} md={5} lg={2}>
                    <SideBar />
                </Grid>
                <Grid xs={12} md={7} lg={10}>
                    {children}
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default AdminLayout;
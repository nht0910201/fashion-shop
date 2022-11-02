import Header from '../components/Header'
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            {/* <div id="preloader" className={cx('preloader')}></div> */}
            <Header/>
            <div className="w-auto">
                <div className="content">{children}</div>
            </div>
            <Footer/>
        </div>   
    );
}
export default DefaultLayout;
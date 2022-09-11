import Header from '../components/Header'
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            {/* <div id="preloader" className={cx('preloader')}></div> */}
            <Header/>
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer/>
        </div>   
    );
}
export default DefaultLayout;
import classNames from 'classnames/bind'
import styles from './Header.module.scss' 

const cx = classNames.bind(styles)

function Header() {
    return (
      <p className={cx('head')}>
        Header
      </p>
    )
}

export default Header;
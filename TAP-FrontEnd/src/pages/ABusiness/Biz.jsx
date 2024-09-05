import { AdminHeader } from '../../components/Header/AdminHeader';
import { BizSideMenu } from '../ASideMenu/BizSideMenu';
import styles from './Biz.module.css';
import { BizContent } from './BizContent';

export const Biz=()=>{

    return(
        <div className={styles.container}>
            <BizSideMenu/>
            <BizContent/>
        </div>
    )
}
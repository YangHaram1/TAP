import { AdminSideMenu } from '../ASideMenu/AdminSideMenu'
import styles from './Admin.module.css'
import { AdminContent } from './AdminContent'

export const Admin=()=>{

    return(
        <div className={styles.container}>
            <AdminSideMenu/>
            <AdminContent/>
        </div>
    )
}
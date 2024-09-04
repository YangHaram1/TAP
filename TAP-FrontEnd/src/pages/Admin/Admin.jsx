import { AdminHeader } from '../../components/Header/AdminHeader'
import styles from './Admin.module.css'

export const Admin=()=>{

    return(
        <div className={styles.container}>
            <AdminHeader/>
            {/* <AdminContent/> */}
        </div>
    )
}
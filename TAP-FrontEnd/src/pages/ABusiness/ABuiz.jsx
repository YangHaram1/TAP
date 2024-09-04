import { AdminHeader } from '../../components/Header/AdminHeader'
import styles from './ABuiz.module.css'
import { ABuizContent } from './ABuizContent'

export const ABuiz=()=>{

    return(
        <div className={styles.container}>
            <AdminHeader/>
            <ABuizContent/>
        </div>
    )
}
